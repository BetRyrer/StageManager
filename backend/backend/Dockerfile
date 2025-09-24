FROM php:8.2-cli

# Installer dépendances système
RUN apt-get update && apt-get install -y unzip git curl libzip-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip dom

# Installer Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copier tout le projet (pas juste composer.json)
COPY . .

# Installer les dépendances Laravel
RUN composer install --no-dev --optimize-autoloader || true

# Donner les permissions
RUN chmod -R 775 storage bootstrap/cache

# Générer une clé Laravel
RUN php artisan key:generate || true

# Lancer Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
