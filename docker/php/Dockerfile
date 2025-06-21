FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        git \
        unzip \
        zip \
        libonig-dev \
        libxml2-dev \
        awscli \
        netcat-openbsd \
        default-mysql-client \
        libssl-dev \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-install pdo_mysql mbstring xml \
    && rm -rf /var/lib/apt/lists/*

# Node.js（Nuxt/Vue用）
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && npm install -g npm

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリを設定
WORKDIR /src

# 先に composer.json と composer.lock をコピーしてキャッシュを有効活用
COPY ./src/composer.json ./src/composer.lock /src/

# Composer の依存関係をインストール
RUN composer install --no-dev --optimize-autoloader

# Laravelのソースコードをコンテナにコピー（ECS用）
COPY ./src/ /src

# 権限の設定（エラーを防ぐため、ディレクトリ作成後に実行）
RUN chown -R www-data:www-data . \
    && chmod -R 775 storage bootstrap/cache

# PHP設定を適用
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

# エントリポイントスクリプトをコピーして実行権限を付与
COPY docker/php/php-entrypoint.sh /usr/local/bin/php-entrypoint.sh
RUN chmod +x /usr/local/bin/php-entrypoint.sh

EXPOSE 9000

# コンテナ起動時に entrypoint.sh を通して起動
ENTRYPOINT ["/usr/local/bin/php-entrypoint.sh"]