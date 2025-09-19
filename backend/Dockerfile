FROM php:8.2-cli

# Installer dépendances système utiles
RUN apt-get update && apt-get install -y unzip git curl

# Installer extensions PHP nécessaires pour Laravel + MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Installer Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copier le code Laravel
COPY . .

# Installer dépendances Laravel
RUN composer install

# Lancer le serveur Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
