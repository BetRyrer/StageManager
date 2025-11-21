FROM php:8.2-fpm AS base

# Installer extensions une seule fois
RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libxml2-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql zip dom gd bcmath

WORKDIR /var/www/html

# Installer Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer


# Étape 2 : dépendances PHP (cache)
FROM base AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction


# Étape 3 : Application finale
FROM base AS app

WORKDIR /var/www/html

COPY --from=vendor /app/vendor ./vendor
COPY . .

RUN composer dump-autoload --optimize
RUN chmod -R 775 storage bootstrap/cache

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8081"]
