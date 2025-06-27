本アプリケーションは、以下の構成でデプロイされています。

インフラ：AWS ECS Fargate

Dockerイメージ管理：Amazon ECR（Elastic Container Registry）

ソースコード管理・CI/CD：GitHub Actions

ソースコードはDockerイメージに含めてビルド

GitHub Actions経由でECRにpushし、ECSへデプロイ

環境変数・設定ファイル管理：AWS Systems Manager Parameter Store（SSM）