# アプリケーションのデプロイ構成

本アプリケーションは、以下の構成でデプロイされています。

- **インフラ**：AWS ECS Fargate
- **Dockerイメージ管理**：Amazon ECR（Elastic Container Registry）
- **ソースコード管理・CI/CD**：GitHub Actions
  - ソースコードは Docker イメージに含めてビルド
  - GitHub Actions 経由で ECR に push → ECS にデプロイ
- **環境変数・設定ファイル管理**：AWS Systems Manager Parameter Store（SSM）

---

## TODO: GitHub Actions セットアップ

- [ ] GitHub Secrets を以下のキーで登録
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `ECR_LARAVEL_REPO`, `ECR_NUXT_REPO`

- [ ] ECS タスク定義ファイルをリポジトリに追加
  - `dev-laravel-task-def-prod.json`
  - `dev-nuxt-task-def-prod.json`
