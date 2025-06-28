#!/bin/sh

# コンテナ起動後にボリュームで上書きされると無効になることがあるため再度実行
chown -R www-data:www-data /src/storage /src/bootstrap/cache
chmod -R 775 /src/storage /src/bootstrap/cache

# ENV_MODE=aws の場合のみ、Parameter Store から /dev/.env を取得して /src/.env に反映する
if [ "$ENV_MODE" = "aws" ]; then
  aws ssm get-parameter \
    --name "/dev/.env" \
    --with-decryption \
    --query "Parameter.Value" \
    --output text > /src/.env || {
      echo "[ERROR] SSM から .env を取得できませんでした。"
      exit 1
    }
fi

# php artisan optimize:clear && php artisan config:cache

# php artisan migrate --force

exec php-fpm -F