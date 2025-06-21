#!/bin/sh

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