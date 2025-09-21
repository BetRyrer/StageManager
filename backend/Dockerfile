FROM php:8.2-cli

# Installer dépendances système utiles
RUN apt-get update && apt-get install -y unzip git curl libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copier d'abord les fichiers de config de Composer pour utiliser le cache Docker
COPY composer.json composer.lock ./

# Installer dépendances Laravel AVANT de copier tout le code
RUN composer install --no-dev --optimize-autoloader

# Copier le reste du code Laravel
COPY . .

# Donner les bonnes permissions à Laravel
RUN chmod -R 775 storage bootstrap/cache

# Générer la clé de l'application si elle n'existe pas
RUN php artisan key:generate || true

# Lancer le serveur Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
