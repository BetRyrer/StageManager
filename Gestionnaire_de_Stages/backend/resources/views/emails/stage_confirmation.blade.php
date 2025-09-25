<p>Bonjour {{ $etudiant->prenom }},</p>

<p>Ton stage chez <strong>{{ $stage->entreprise?->nom ?? 'Entreprise non définie' }}</strong> a été confirmé ✅.</p>
<p>Il commencera le <strong>{{ $stage->date_debut }}</strong> et se terminera le <strong>{{ $stage->date_fin }}</strong>.</p>

<p>Tuteur : {{ $stage->tuteur?->nom ?? 'Non défini' }} ({{ $stage->tuteur?->email ?? 'Non défini' }})</p>

<p>Bonne préparation,</p>
<p>L’équipe pédagogique</p>
