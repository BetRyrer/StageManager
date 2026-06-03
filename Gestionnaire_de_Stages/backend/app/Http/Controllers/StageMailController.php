<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Models\MailLog;
use App\Models\MailTemplate;
use App\Jobs\EnvoyerMailEtudiant;

class StageMailController extends Controller
{
    public function envoyerMails(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:etudiants,id',
            'type' => 'required|string',
            'cc' => 'nullable|array',
            'cc.*' => 'email',
            'subject' => 'required_if:type,custom|nullable|string|max:255',
            'body' => 'required_if:type,custom|nullable|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:5120',
            'send_at' => 'nullable|date|after:now',
        ]);

        $template = null;

        if ($validated['type'] !== 'custom') {
            $template = MailTemplate::where('type', $validated['type'])->firstOrFail();
        }

        $attachmentPaths = $this->storeAttachments($request);

        $etudiants = Etudiant::whereIn('id', $validated['ids'])
            ->with(['stage.tuteur'])
            ->get();

        $dispatched = 0;
        $skipped = [];

        foreach ($etudiants as $etu) {
            $stage = $etu->stage;
            $email = $etu->mail_universitaire ?: $etu->mail_perso;

            if (!$stage || empty($email)) {
                $skipped[] = [
                    'etudiant_id' => $etu->id,
                    'nom' => $etu->nom,
                    'prenom' => $etu->prenom,
                    'raison' => !$stage ? 'Aucun stage associé' : 'Aucun email disponible',
                ];

                continue;
            }

            [$subject, $body] = $this->resolveContent($validated, $template, $etu, $stage);

            $log = MailLog::create([
                'etudiant_id' => $etu->id,
                'type' => $validated['type'],
                'email' => $email,
                'subject' => $subject,
                'cc' => json_encode($this->buildCcList($stage, $validated['cc'] ?? [])),
                'status' => 'pending',
                'sent_at' => null,
                'body_snapshot' => $body,
            ]);

            $job = new EnvoyerMailEtudiant(
                mailLogId: $log->id,
                email: $email,
                subject: $subject,
                body: $body,
                ccList: $this->buildCcList($stage, $validated['cc'] ?? []),
                attachmentPaths: $attachmentPaths,
            );

            if (!empty($validated['send_at'])) {
                $job->delay(now()->diffInSeconds($validated['send_at']));
            }

            dispatch($job)->onQueue('mails');

            $dispatched++;
        }

        return response()->json([
            'success' => true,
            'dispatched' => $dispatched,
            'skipped' => $skipped,
            'message' => "{$dispatched} mail(s) mis en queue, " . count($skipped) . " ignoré(s).",
        ]);
    }

    public function preview(Request $request)
    {
        $validated = $request->validate([
            'etudiant_id' => 'required|integer|exists:etudiants,id',
            'type' => 'required|string',
            'subject' => 'required_if:type,custom|nullable|string',
            'body' => 'required_if:type,custom|nullable|string',
        ]);

        $etu = Etudiant::with(['stage.tuteur'])->findOrFail($validated['etudiant_id']);
        $stage = $etu->stage;

        if (!$stage) {
            return response()->json([
                'error' => 'Etudiant sans stage',
            ], 422);
        }

        $template = null;

        if ($validated['type'] !== 'custom') {
            $template = MailTemplate::where('type', $validated['type'])->firstOrFail();
        }

        [$subject, $body] = $this->resolveContent($validated, $template, $etu, $stage);

        return response()->json([
            'success' => true,
            'subject' => $subject,
            'body' => $this->formatEmailContent($body),
            'to' => $etu->mail_universitaire ?? $etu->mail_perso,
            'cc' => $this->buildCcList($stage, []),
        ]);
    }

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

    public function retry(int $logId)
    {
        $log = MailLog::findOrFail($logId);

        if ($log->status !== 'failed') {
            return response()->json([
                'error' => 'Seuls les mails en échec peuvent être renvoyés',
            ], 422);
        }

        if ($log->retry_count >= 3) {
            return response()->json([
                'error' => 'Nombre maximum de tentatives atteint (3)',
            ], 422);
        }

        $log->update([
            'status' => 'pending',
        ]);

        dispatch(new EnvoyerMailEtudiant(
            mailLogId: $log->id,
            email: $log->email,
            subject: $log->subject,
            body: $log->body_snapshot ?? '',
            ccList: json_decode($log->cc, true) ?? [],
            attachmentPaths: [],
        ))->onQueue('mails');

        return response()->json([
            'success' => true,
            'message' => 'Mail remis en queue',
        ]);
    }

    private function resolveContent(array $data, $template, $etu, $stage): array
    {
        if ($data['type'] === 'custom') {
            $subject = $this->parseTemplate($data['subject'] ?? '', $etu, $stage);
            $body = $this->parseTemplate($data['body'] ?? '', $etu, $stage);
        } else {
            $subject = $this->parseTemplate($template->subject, $etu, $stage);
            $body = $this->parseTemplate($template->body, $etu, $stage);
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
        if (empty($template)) {
            return '';
        }

        $tuteurNom = $stage->tuteur->nom ?? '';
        $tuteurPrenom = $stage->tuteur->prenom ?? '';

        $replacements = [
            '{{nom}}' => $etu->nom ?? '',
            '{{prenom}}' => $etu->prenom ?? '',
            '{{email}}' => $etu->mail_universitaire ?? $etu->mail_perso ?? '',
            '{{date_debut}}' => !empty($stage->date_debut)
                ? \Carbon\Carbon::parse($stage->date_debut)->format('d/m/Y')
                : '',
            '{{date_fin}}' => !empty($stage->date_fin)
                ? \Carbon\Carbon::parse($stage->date_fin)->format('d/m/Y')
                : '',
            '{{entreprise}}' => $stage->entreprise ?? '',
            '{{tuteur}}' => trim("{$tuteurPrenom} {$tuteurNom}"),
            '{{tuteur_email}}' => $stage->tuteur->email ?? '',
            '{{annee_scolaire}}' => $this->getAnneeScolaire(),
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }

    private function formatEmailContent(string $content): string
    {
        $content = strip_tags($content, '<b><i><u><br><p><strong><em><ul><ol><li><a>');
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