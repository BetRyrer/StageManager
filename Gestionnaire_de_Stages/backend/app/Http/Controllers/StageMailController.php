<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Etudiant;
use App\Models\MailLog;
use App\Models\MailTemplate;

class StageMailController extends Controller
{
    public function envoyerMails(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'type' => 'required|string',
            'cc'   => 'nullable|array',
            'cc.*' => 'email',
            'subject' => 'nullable|string',
            'body'    => 'nullable|string',
        ]);

        // Si ce n'est pas "custom", on va chercher dans la table
        $template = null;
        if ($request->type !== 'custom') {
            $template = MailTemplate::where('type', $request->type)->firstOrFail();
        }

        $etudiants = Etudiant::whereIn('id', $request->ids)
            ->with('stage.tuteur')
            ->get();

        foreach ($etudiants as $etu) {
            $stage = $etu->stage;
            $email = $etu->mail_universitaire ?? $etu->mail_perso ?? null;
            if (!$stage || empty($email)) continue;

            // 🔹 Cas custom → on prend ce qui vient du front
            if ($request->type === 'custom') {
                $subject = $this->parseTemplate($request->subject, $etu, $stage);
                $body    = $this->parseTemplate($request->body, $etu, $stage);
            } else {
                // 🔹 Cas avec modèle en BDD
                $subject = $this->parseTemplate($template->subject, $etu, $stage);
                $body    = $this->parseTemplate($template->body, $etu, $stage);
            }

            Mail::send([], [], function ($message) use ($etu, $stage, $email, $subject, $body, $request) {
                $message->to($email)
                        ->subject($subject)
                        ->html($body);

                if (!empty($stage->tuteur?->email)) {
                    $message->cc($stage->tuteur->email);
                }

                if (!empty($request->cc)) {
                    foreach ($request->cc as $ccEmail) {
                        $message->cc($ccEmail);
                    }
                }
            });

            MailLog::create([
                'etudiant_id' => $etu->id,
                'type' => $request->type,
                'email' => $email,
                'sent_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Mails envoyés avec succès ✅']);
    }

    private function parseTemplate($template, $etu, $stage)
    {
        if (empty($template)) return '';

        $replacements = [
            '{{nom}}' => $etu->nom,
            '{{prenom}}' => $etu->prenom,
            '{{email}}' => $etu->mail_universitaire ?? $etu->mail_perso ?? '',
            '{{date_debut}}' => $stage->date_debut ?? '',
            '{{date_fin}}' => $stage->date_fin ?? '',
            '{{entreprise}}' => $stage->entreprise ?? '',
            '{{tuteur}}' => $stage->tuteur->nom ?? '',
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }
}
