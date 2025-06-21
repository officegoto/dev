#!/bin/sh
set -e

# 環境変数のチェック
if [ "$ENV_MODE" = "aws" ]; then

    # AWS SSM から Nginx 設定を取得して `/etc/nginx/conf.d/default.conf` に保存
    aws ssm get-parameter \
        --name "/dev/nginx-config/default.conf" \
        --with-decryption \
        --query "Parameter.Value" \
        --output text > /etc/nginx/conf.d/default.conf || {
            echo "[ERROR] SSM から Nginx の default.conf を取得できませんでした。"
            exit 1
    }

fi

# Nginx を起動
exec nginx -g "daemon off;"
