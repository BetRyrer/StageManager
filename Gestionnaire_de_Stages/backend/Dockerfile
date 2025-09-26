FROM php:8.2-fpm

# Installer dépendances système + GD
RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libxml2-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-jpeg --with-freetype \
    && docker-php-ext-install pdo pdo_mysql zip dom gd

# Installer Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copier tout le projet
COPY . .

# Installer les dépendances Laravel
RUN composer install --no-dev --optimize-autoloader || true

# Donner les permissions
RUN chmod -R 775 storage bootstrap/cache

# Lancer Laravel (serveur PHP intégré pour dev)
CMD php artisan serve --host=0.0.0.0 --port=8000
