<p>Bonjour {{ $etudiant->prenom }},</p>

<p>Petit rappel ⏰ : ton stage chez <strong>{{ $stage->entreprise }}</strong> commence bientôt.</p>
<p>Date de début : <strong>{{ $stage->date_debut }}</strong></p>
<p>Adresse : {{ $stage->entreprise_adresse ?? 'Adresse non renseignée' }}</p>

<p>Contacte ton tuteur ({{ $stage->tuteur->nom }}) si besoin.</p>

<p>À très vite,</p>
<p>L’équipe pédagogique</p>
