<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Etudiant;
use App\Models\MailLog;
use App\Mail\StageConfirmationMail;
use App\Mail\StageRappelMail;
use App\Mail\StageFinMail;
use Carbon\Carbon;

class StageMailController extends Controller
{
    public function envoyerMails(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'type' => 'required|string|in:confirmation,rappel,fin',
        ]);

        $etudiants = Etudiant::whereIn('id', $request->ids)
            ->with('stage.tuteur')
            ->get();

        foreach ($etudiants as $etu) {
            $stage = $etu->stage;

            if (!$stage) {
                continue; // skip si pas de stage
            }

            switch ($request->type) {
                case 'confirmation':
                    Mail::to($etu->email)->send(new StageConfirmationMail($etu, $stage));
                    break;

                case 'rappel':
                    Mail::to($etu->email)->send(new StageRappelMail($etu, $stage));
                    break;

                case 'fin':
                    Mail::to($etu->email)->send(new StageFinMail($etu, $stage));
                    break;
            }

            //  Log en base
            MailLog::create([
                'etudiant_id' => $etu->id,
                'type' => $request->type,
                'email' => $etu->email,
                'sent_at' => Carbon::now(),
            ]);
        }

        return response()->json(['message' => 'Mails envoyés avec succès et logs enregistrés ✅']);
    }
}
