<?php

namespace App\Http\Controllers;

use App\Models\MailLog;

class MailLogController extends Controller
{
    /**
     * Affiche tous les logs des mails envoyés
     */
    public function index()
    {
        return MailLog::with('etudiant') // récupère aussi l'étudiant lié
            ->orderBy('sent_at', 'desc')
            ->get();
    }

    /**
     * Affiche un log spécifique
     */
    public function show($id)
    {
        return MailLog::with('etudiant')->findOrFail($id);
    }
}
