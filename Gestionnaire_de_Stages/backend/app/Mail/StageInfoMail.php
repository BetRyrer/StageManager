<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StageInfoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $etudiant;
    public $entreprise;
    public $stage;

    public function __construct($etudiant, $entreprise, $stage)
    {
        $this->etudiant = $etudiant;
        $this->entreprise = $entreprise;
        $this->stage = $stage;
    }

    public function build()
    {
        return $this->subject('Informations concernant votre stage')
                    ->view('emails.stage-info');
    }
}
