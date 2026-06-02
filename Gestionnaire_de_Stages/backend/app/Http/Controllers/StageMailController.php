<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use App\Models\Etudiant;
use App\Models\MailLog;
use App\Models\MailTemplate;
use App\Jobs\EnvoyerMailEtudiant;
use App\DTOs\MailPayloadDTO;

class StageMailController extends Controller
{
    /**
     * Envoi en masse — dispatche un Job par étudiant
     */
    public function envoyerMails(Request $request)
    {
        $validated = $request->validate([
            'ids'          => 'required|array|min:1',
            'ids.*'        => 'integer|exists:etudiants,id',
            'type'         => 'required|string',
            'cc'           => 'nullable|array',
            'cc.*'         => 'email',
            'subject'      => 'required_if:type,custom|nullable|string|max:255',
            'body'         => 'required_if:type,custom|nullable|string',
            'attachments'  => 'nullable|array',
            'attachments.*'=> 'file|mimes:pdf,docx,xlsx|max:5120', // 5 Mo max
            'send_at'      => 'nullable|date|after:now', // envoi différé optionnel
        ]);

        // Résolution du template
        $request->validate([
            'ids'             => 'required|array',
            'ids.*'           => 'integer|exists:etudiants,id',
            'type'            => 'required|string',
            'cc'              => 'nullable|array',
            'cc.*'            => 'email',
            'subject'         => 'nullable|string',
            'body'            => 'nullable|string',
            'attachments'     => 'nullable|array',
            'attachments.*'   => 'file|max:5120', // 5MB max par fichier
        ]);

        $template = null;
        if ($validated['type'] !== 'custom') {
            $template = MailTemplate::where('type', $validated['type'])->firstOrFail();

        if ($request->type !== 'custom') {
            $template = MailTemplate::where('type', $request->type)->firstOrFail();
        }

        // Stockage des pièces jointes (avant de passer en queue)
        $attachmentPaths = $this->storeAttachments($request);

        $etudiants = Etudiant::whereIn('id', $validated['ids'])
            ->with(['stage.tuteur'])
            ->get();

        $dispatched = 0;
        $skipped    = [];

        $successCount = 0;
        $skipped = [];

        foreach ($etudiants as $etu) {
            $stage = $etu->stage;
            $email = $etu->mail_universitaire ?: $etu->mail_perso;

            // Skip si données manquantes
            if (!$stage || empty($email)) {
                $skipped[] = [
                    'id'     => $etu->id,
                    'nom'    => "{$etu->prenom} {$etu->nom}",
                    'raison' => !$stage ? 'Aucun stage associé' : 'Email manquant',
                ];
                $skipped[] = [
                    'etudiant_id' => $etu->id,
                    'nom' => $etu->nom,
                    'prenom' => $etu->prenom,
                    'raison' => !$stage ? 'Aucun stage associé' : 'Aucun email disponible',
                ];
                continue;
            }

            // Résolution sujet + corps
            [$subject, $body] = $this->resolveContent($validated, $template, $etu, $stage);

            // Création du log avec status PENDING
            $log = MailLog::create([
            if ($request->type === 'custom') {
                $subject = $this->parseTemplate($request->subject, $etu, $stage);
                $body    = $this->parseTemplate($request->body, $etu, $stage);
            } else {
                $subject = $this->parseTemplate($template->subject, $etu, $stage);
                $body    = $this->parseTemplate($template->body, $etu, $stage);
            }

            $formattedBody = $this->formatEmailContent($body);

            Mail::send(
                'emails.generic',
                ['content' => $formattedBody],
                function ($message) use ($email, $subject, $stage, $request) {
                    $message->to($email)->subject($subject);

                    // CC tuteur
                    if (!empty($stage->tuteur?->email)) {
                        $message->cc($stage->tuteur->email);
                    }

                    // CC manuels
                    if (!empty($request->cc)) {
                        foreach ($request->cc as $ccEmail) {
                            $message->cc($ccEmail);
                        }
                    }

                    // Pièces jointes
                    if ($request->hasFile('attachments')) {
                        foreach ($request->file('attachments') as $file) {
                            if ($file->isValid()) {
                                $message->attach(
                                    $file->getRealPath(),
                                    [
                                        'as'   => $file->getClientOriginalName(),
                                        'mime' => $file->getMimeType(),
                                    ]
                                );
                            }
                        }
                    }
                }
            );

            MailLog::create([
                'etudiant_id' => $etu->id,
                'type'        => $validated['type'],
                'email'       => $email,
                'subject'     => $subject,
                'cc'          => json_encode($this->buildCcList($stage, $validated['cc'] ?? [])),
                'status'      => 'pending',
                'sent_at'     => null,
            ]);

            // Dispatch du job (queue ou immédiat selon send_at)
            $job = new EnvoyerMailEtudiant(
                mailLogId:       $log->id,
                email:           $email,
                subject:         $subject,
                body:            $body,
                ccList:          $this->buildCcList($stage, $validated['cc'] ?? []),
                attachmentPaths: $attachmentPaths,
            );

            if (!empty($validated['send_at'])) {
                $job->delay(now()->diffInSeconds($validated['send_at']));
            }

            dispatch($job)->onQueue('mails');

            $dispatched++;
                'sent_at'     => now(),
            ]);

            $successCount++;
        }

        return response()->json([
            'success'    => true,
            'dispatched' => $dispatched,
            'skipped'    => $skipped,
            'message'    => "{$dispatched} mail(s) mis en queue, " . count($skipped) . " ignoré(s).",
        ]);
    }

    /**
     * Preview d'un mail pour un étudiant donné
     */
    public function preview(Request $request)
    {
        $request->validate([
            'etudiant_id' => 'required|integer|exists:etudiants,id',
            'type'        => 'required|string',
            'subject'     => 'required_if:type,custom|nullable|string',
            'body'        => 'required_if:type,custom|nullable|string',
        ]);

        $etu = Etudiant::with(['stage.tuteur'])->findOrFail($request->etudiant_id);
        $stage = $etu->stage;

        if (!$stage) {
            return response()->json(['error' => 'Etudiant sans stage'], 422);
        }

        $template = null;
        if ($request->type !== 'custom') {
            $template = MailTemplate::where('type', $request->type)->firstOrFail();
        }

        [$subject, $body] = $this->resolveContent($request->all(), $template, $etu, $stage);

        return response()->json([
            'subject' => $subject,
            'body'    => $this->formatEmailContent($body),
            'to'      => $etu->mail_universitaire ?? $etu->mail_perso,
            'success' => true,
            'message' => 'Mails envoyés avec succès',
            'sent_count' => $successCount,
            'skipped' => $skipped,
        ]);
    }

    /**
     * Logs avec filtres + pagination
     */
    public function logs(Request $request)
    {
        $query = MailLog::with('etudiant')
            ->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('etudiant_id')) {
            $query->where('etudiant_id', $request->etudiant_id);
        }

        return response()->json($query->paginate(50));
    }

    /**
     * Renvoi d'un mail en erreur
     */
    public function retry(int $logId)
    {
        $log = MailLog::findOrFail($logId);

        if ($log->status !== 'failed') {
            return response()->json(['error' => 'Seuls les mails en échec peuvent être renvoyés'], 422);
        }

        if ($log->retry_count >= 3) {
            return response()->json(['error' => 'Nombre maximum de tentatives atteint (3)'], 422);
        }

        $log->update(['status' => 'pending']);

        dispatch(new EnvoyerMailEtudiant(
            mailLogId:       $log->id,
            email:           $log->email,
            subject:         $log->subject,
            body:            $log->body_snapshot ?? '',
            ccList:          json_decode($log->cc, true) ?? [],
            attachmentPaths: [],
        ))->onQueue('mails');

        return response()->json(['success' => true, 'message' => 'Mail remis en queue']);
    }

    // ─── Helpers privés ──────────────────────────────────────────────────────

    private function resolveContent(array $data, $template, $etu, $stage): array
    {
        if ($data['type'] === 'custom') {
            $subject = $this->parseTemplate($data['subject'] ?? '', $etu, $stage);
            $body    = $this->parseTemplate($data['body'] ?? '', $etu, $stage);
        } else {
            $subject = $this->parseTemplate($template->subject, $etu, $stage);
            $body    = $this->parseTemplate($template->body, $etu, $stage);
        }

        return [$subject, $body];
    }

    private function buildCcList($stage, array $manualCcs): array
    {
        $cc = [];

        if (!empty($stage->tuteur?->email)) {
            $cc[] = $stage->tuteur->email;
        }

        foreach ($manualCcs as $email) {
            if (!in_array($email, $cc)) {
                $cc[] = $email;
            }
        }

        return $cc;
    }

    private function storeAttachments(Request $request): array
    {
        $paths = [];
        foreach ($request->file('attachments', []) as $file) {
            $paths[] = $file->store('mail-attachments', 'local');
        }
        return $paths;
    }

    private function parseTemplate(?string $template, $etu, $stage): string
    {
        if (empty($template)) return '';

        $tuteurNom = $stage->tuteur->nom ?? 'N/A';
        $tuteurPrenom = $stage->tuteur->prenom ?? '';

        $replacements = [
            '{{nom}}'            => $etu->nom ?? '',
            '{{prenom}}'         => $etu->prenom ?? '',
            '{{email}}'          => $etu->mail_universitaire ?? $etu->mail_perso ?? '',
            '{{date_debut}}'     => $stage->date_debut
                                    ? \Carbon\Carbon::parse($stage->date_debut)->format('d/m/Y')
                                    : '',
            '{{date_fin}}'       => $stage->date_fin
                                    ? \Carbon\Carbon::parse($stage->date_fin)->format('d/m/Y')
                                    : '',
            '{{entreprise}}'     => $stage->entreprise ?? '',
            '{{tuteur}}'         => trim("{$tuteurPrenom} {$tuteurNom}"),
            '{{tuteur_email}}'   => $stage->tuteur->email ?? '',
            '{{annee_scolaire}}' => $this->getAnneeScolaire(),
            '{{nom}}'        => $etu->nom ?? '',
            '{{prenom}}'     => $etu->prenom ?? '',
            '{{email}}'      => $etu->mail_universitaire ?? $etu->mail_perso ?? '',
            '{{date_debut}}' => !empty($stage->date_debut) ? \Carbon\Carbon::parse($stage->date_debut)->format('d/m/Y') : '',
            '{{date_fin}}'   => !empty($stage->date_fin) ? \Carbon\Carbon::parse($stage->date_fin)->format('d/m/Y') : '',
            '{{entreprise}}' => $stage->entreprise ?? '',
            '{{tuteur}}'     => $stage->tuteur->nom ?? '',
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }

    /**
     * Formatage HTML email
     */
    private function formatEmailContent(string $content): string
    {
        // Strip les balises dangereuses si saisie manuelle (custom)
        $content = strip_tags($content, '<b><i><u><br><p><strong><em><ul><ol><li><a>');

        // Collapse les lignes vides multiples
        $content = preg_replace("/(\r?\n){3,}/", "\n\n", $content);
        $content = preg_replace("/\n{3,}/", "\n\n", trim($content));

        return nl2br(e($content));
    }

    private function getAnneeScolaire(): string
    {
        $year = now()->month >= 9 ? now()->year : now()->year - 1;
        return "{$year}-" . ($year + 1);
    }
}
}