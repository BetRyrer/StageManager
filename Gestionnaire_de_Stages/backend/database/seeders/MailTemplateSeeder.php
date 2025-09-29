<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MailTemplate;

class MailTemplateSeeder extends Seeder
{
    public function run()
    {
        MailTemplate::updateOrCreate(
            ['type' => 'confirmation'],
            [
                'subject' => 'Confirmation de ton stage',
                'body' => 'Bonjour {{prenom}} {{nom}},<br><br>
                           Ton stage commence le {{date_debut}} chez {{entreprise}}.<br>
                           Ton tuteur est {{tuteur}}.<br><br>
                           Bonne chance !'
            ]
        );

        MailTemplate::updateOrCreate(
            ['type' => 'rappel'],
            [
                'subject' => 'Rappel : ton stage approche',
                'body' => 'Bonjour {{prenom}},<br><br>
                           Petit rappel : ton stage commence le {{date_debut}}.<br>
                           Merci de vérifier que tes documents sont prêts.'
            ]
        );

        MailTemplate::updateOrCreate(
            ['type' => 'fin'],
            [
                'subject' => 'Fin de ton stage',
                'body' => 'Bonjour {{prenom}},<br><br>
                           Ton stage chez {{entreprise}} s’est terminé le {{date_fin}}.<br>
                           Merci pour ton engagement.<br>
                           N’oublie pas d’envoyer les pièces justificatives.'
            ]
        );
    }
}
