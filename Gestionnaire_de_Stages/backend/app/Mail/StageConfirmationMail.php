<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StageConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $etudiant;
    public $stage;

    public function __construct($etudiant, $stage)
    {
        $this->etudiant = $etudiant;
        $this->stage = $stage;
    }

    public function build()
    {
        return $this->subject("Confirmation de ton stage")
                    ->view('emails.stage_confirmation');
    }
}
