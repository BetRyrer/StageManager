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
            'ids'     => 'required|array',
            'type'    => 'required|string',
            'cc'      => 'nullable|array',
            'cc.*'    => 'email',
            'subject' => 'nullable|string',
            'body'    => 'nullable|string',
        ]);

        // Template si non custom
        $template = null;
        if ($request->type !== 'custom') {
            $template = MailTemplate::where('type', $request->type)->firstOrFail();
        }

        $etudiants = Etudiant::whereIn('id', $request->ids)
            ->with(['stage.tuteur'])
            ->get();

        foreach ($etudiants as $etu) {

            $stage = $etu->stage;
            $email = $etu->mail_universitaire ?? $etu->mail_perso;

            if (!$stage || empty($email)) {
                continue;
            }

            // Sujet + contenu
            if ($request->type === 'custom') {
                $subject = $this->parseTemplate($request->subject, $etu, $stage);
                $body    = $this->parseTemplate($request->body, $etu, $stage);
            } else {
                $subject = $this->parseTemplate($template->subject, $etu, $stage);
                $body    = $this->parseTemplate($template->body, $etu, $stage);
            }

            //  FORMATAGE EMAIL ICI
            $formattedBody = $this->formatEmailContent($body);

            Mail::send(
                'emails.generic',
                ['content' => $formattedBody],
                function ($message) use ($email, $subject, $stage, $request) {

                    $message->to($email)
                            ->subject($subject);

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
                }
            );

            MailLog::create([
                'etudiant_id' => $etu->id,
                'type'        => $request->type,
                'email'       => $email,
                'sent_at'     => now(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Mails envoyés avec succès'
        ]);
    }

    /**
     * Remplacement des variables {{ }}
     */
    private function parseTemplate(?string $template, $etu, $stage): string
    {
        if (empty($template)) {
            return '';
        }

        $replacements = [
            '{{nom}}'         => $etu->nom ?? '',
            '{{prenom}}'      => $etu->prenom ?? '',
            '{{email}}'       => $etu->mail_universitaire ?? $etu->mail_perso ?? '',
            '{{date_debut}}'  => $stage->date_debut ?? '',
            '{{date_fin}}'    => $stage->date_fin ?? '',
            '{{entreprise}}'  => $stage->entreprise ?? '',
            '{{tuteur}}'      => $stage->tuteur->nom ?? '',
        ];

        return str_replace(
            array_keys($replacements),
            array_values($replacements),
            $template
        );
    }

    /**
     *  FORMATAGE HTML EMAIL (ANTI GROS ESPACES)
     */
    private function formatEmailContent(string $content): string
    {
        // Supprime les lignes vides multiples
        $content = preg_replace("/\n{2,}/", "\n", $content);

        // Sécurise le HTML + transforme \n en <br>
        return nl2br(e($content));
    }
}
