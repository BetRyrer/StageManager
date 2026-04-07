<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\MailLog;

class EnvoyerMailEtudiant implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Nombre de tentatives automatiques avant échec définitif
     */
    public int $tries = 3;

    /**
     * Délai entre chaque retry (en secondes) : 1min, 5min, 15min
     */
    public array $backoff = [60, 300, 900];

    /**
     * Timeout du job
     */
    public int $timeout = 30;

    public function __construct(
        public readonly int    $mailLogId,
        public readonly string $email,
        public readonly string $subject,
        public readonly string $body,
        public readonly array  $ccList,
        public readonly array  $attachmentPaths,
    ) {}

    public function handle(): void
    {
        $log = MailLog::findOrFail($this->mailLogId);

        try {
            Mail::send(
                'emails.generic',
                ['content' => $this->body],
                function ($message) {
                    $message->to($this->email)
                            ->subject($this->subject);

                    foreach ($this->ccList as $cc) {
                        $message->cc($cc);
                    }

                    foreach ($this->attachmentPaths as $path) {
                        if (Storage::disk('local')->exists($path)) {
                            $message->attachFromStorage($path);
                        }
                    }
                }
            );

            // Succès
            $log->update([
                'status'      => 'sent',
                'sent_at'     => now(),
                'error_message' => null,
            ]);

        } catch (\Throwable $e) {
            // Incrémente le compteur de retry
            $log->increment('retry_count');
            $log->update([
                'status'        => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            Log::error("Mail failed [log #{$this->mailLogId}] → {$this->email} : {$e->getMessage()}");

            // Relance automatique via le mécanisme de retry Laravel
            throw $e;
        }
    }

    /**
     * Appelé quand toutes les tentatives sont épuisées
     */
    public function failed(\Throwable $e): void
    {
        MailLog::where('id', $this->mailLogId)->update([
            'status'        => 'failed',
            'error_message' => "Échec définitif après {$this->tries} tentatives : " . $e->getMessage(),
        ]);

        Log::critical("Mail définitivement échoué [log #{$this->mailLogId}]", [
            'email' => $this->email,
            'error' => $e->getMessage(),
        ]);
    }
}