# Gestionnaire de Stages

Application web de gestion des stages étudiants : suivi des étudiants, entreprises, tuteurs, conventions de stage, soutenances et envoi d'e-mails automatisés.

Le projet est composé d'une API REST **Laravel 12** (PHP) et d'un frontend **React 18 + TypeScript**, orchestrés via **Docker Compose**.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation avec Docker (recommandé)](#installation-avec-docker-recommandé)
- [Installation manuelle](#installation-manuelle)
- [Variables d'environnement](#variables-denvironnement)
- [Utilisation](#utilisation)
- [Documentation de l'API](#documentation-de-lapi)
- [Tests](#tests)
- [Déploiement en production](#déploiement-en-production)

## Fonctionnalités

- **Authentification** par token (login / route protégées via middleware `auth.token`)
- **Étudiants** : CRUD complet, recherche
- **Entreprises** : CRUD complet
- **Tuteurs** (entreprise) et **Tuteurs école** : CRUD, rattachement aux étudiants
- **Stages** : CRUD, import en masse depuis un fichier Excel, statut calculé automatiquement (à venir / en cours / terminé)
- **Soutenances** : planification et gestion des soutenances de stage
- **Tableau de bord** : indicateurs sur les stages
- **Envoi d'e-mails** : templates, prévisualisation, envoi en masse, historique des envois (logs) et réessai en cas d'échec
- **Documentation API** générée automatiquement (Swagger / OpenAPI)

## Stack technique

**Backend**
- PHP 8.2 / Laravel 12
- MariaDB 11
- `darkaonline/l5-swagger` (documentation OpenAPI)
- `maatwebsite/excel` (import Excel)
- Mailhog (capture des e-mails en développement)

**Frontend**
- React 18 + TypeScript (Create React App)
- React Router 6
- Tailwind CSS
- Axios
- styled-components / lucide-react / react-data-table-component

**Infrastructure**
- Docker & Docker Compose (environnements dev et prod)
- Nginx (reverse proxy en production)

## Architecture du projet

```
Gestionnaire_de_Stages/
├── backend/                # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/   # Contrôleurs (Etudiant, Entreprise, Tuteur, Stage, Soutenance, Mail, Auth...)
│   │   ├── Http/Middleware/    # AuthTokenMiddleware
│   │   ├── Models/              # Etudiant, Entreprise, Tuteur, TuteurEcole, Stage, Soutenance, MailLog, MailTemplate, User
│   │   ├── Imports/             # Import Excel des stages
│   │   ├── Jobs/ Mail/          # Envoi d'e-mails asynchrone
│   │   └── Swagger/             # Annotations OpenAPI
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   ├── Dockerfile / Dockerfile.prod
│   └── composer.json
├── frontend/                # Application React
│   └── src/
│       ├── api/                 # Client Axios
│       └── features/            # Un dossier par domaine métier
│           ├── login/
│           ├── dashboard/
│           ├── etudiant/
│           ├── stages/
│           ├── tuteurs/
│           ├── soutenances/
│           ├── emails/
│           ├── datatable/
│           └── common/          # Header, Footer, ProtectedRoute
├── nginx/nginx.conf         # Configuration Nginx (production)
├── docker-compose.yml       # Environnement de développement
└── docker-compose.prod.yml  # Environnement de production
```

## Prérequis

- [Docker](https://www.docker.com/) et Docker Compose
- (Pour une installation manuelle) PHP >= 8.2, Composer, Node.js >= 18, un serveur MariaDB/MySQL

## Installation avec Docker (recommandé)

1. Cloner le dépôt et se placer dans le dossier du projet :

   ```bash
   cd Gestionnaire_de_Stages
   ```

2. Créer le fichier `backend/.env` (absent du dépôt car ignoré par Git) avec au minimum les valeurs suivantes, cohérentes avec `docker-compose.yml` :

   ```env
   APP_NAME="Gestionnaire de Stages"
   APP_ENV=local
   APP_KEY=
   APP_DEBUG=true
   APP_URL=http://localhost:8081

   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=stages_db
   DB_USERNAME=laravel
   DB_PASSWORD=laravel

   MAIL_MAILER=smtp
   MAIL_HOST=mailhog
   MAIL_PORT=1025
   MAIL_FROM_ADDRESS=no-reply@stage-manager.fr
   ```

3. Vérifier que `frontend/.env` pointe vers l'API :

   ```
   REACT_APP_API_URL=http://localhost:8081/api
   ```

4. Lancer les conteneurs :

   ```bash
   docker compose up -d --build
   ```

5. Générer la clé d'application, exécuter les migrations et les seeders :

   ```bash
   docker compose exec laravel php artisan key:generate
   docker compose exec laravel php artisan migrate --seed
   ```

6. Accéder à l'application :

   | Service            | URL                                     |
   |--------------------|------------------------------------------|
   | Frontend           | http://localhost:3000                   |
   | API Laravel        | http://localhost:8081/api                |
   | Documentation API  | http://localhost:8081/api/documentation  |
   | Mailhog (emails)   | http://localhost:8025                    |
   | MariaDB            | localhost:3308                           |

## Installation manuelle

**Backend**

```bash
cd backend
composer install
# Créer le fichier .env (voir la section "Variables d'environnement")
php artisan key:generate
# Configurer la connexion base de données dans .env
php artisan migrate --seed
composer run dev   # lance serveur, worker de queue, logs et Vite en parallèle
```

**Frontend**

```bash
cd frontend
npm install
npm start
```

## Variables d'environnement

**`backend/.env`** (principales clés à configurer) :

| Variable                | Description                                  |
|-------------------------|-----------------------------------------------|
| `APP_ENV`               | `local` ou `production`                       |
| `APP_KEY`               | Clé générée via `php artisan key:generate`    |
| `APP_URL`               | URL de base de l'API                          |
| `DB_CONNECTION`         | `mysql`                                       |
| `DB_HOST`               | `db` (nom du service Docker) ou `127.0.0.1`   |
| `DB_PORT`               | `3306` en interne (`3308` exposé par Docker)  |
| `DB_DATABASE`           | `stages_db`                                   |
| `DB_USERNAME` / `DB_PASSWORD` | `laravel` / `laravel`                   |
| `MAIL_HOST` / `MAIL_PORT`     | `mailhog` / `1025` en développement     |

**`frontend/.env`** :

| Variable              | Description                          |
|-----------------------|----------------------------------------|
| `REACT_APP_API_URL`   | URL de base de l'API (`http://localhost:8081/api`) |

## Utilisation

1. Se connecter via `/login` avec un compte utilisateur créé en base (table `users`).
2. Le token retourné est stocké côté frontend et transmis via l'en-tête `Authorization: Bearer <token>` sur toutes les routes protégées.
3. Naviguer entre les modules : Étudiants, Stages, Tuteurs, Soutenances, Envoi d'e-mails, Tableau de bord.

## Documentation de l'API

La documentation OpenAPI est générée avec L5 Swagger :

```bash
docker compose exec laravel php artisan l5-swagger:generate
```

Elle est ensuite disponible sur : `http://localhost:8081/api/documentation`

## Tests

```bash
cd backend
composer test
# ou directement
php artisan test
```

## Déploiement en production

Le fichier `docker-compose.prod.yml` déploie :
- l'API Laravel (PHP-FPM, config/route/vue mises en cache),
- Nginx en frontal HTTPS (certificats Let's Encrypt) servant le build React et proxifiant l'API,
- MariaDB.

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

> ⚠️ Pensez à générer une `APP_KEY` dédiée à la production et à ne jamais réutiliser celle d'un environnement de développement.
