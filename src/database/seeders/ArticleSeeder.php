<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'slug' => 'getting-started-with-nuxt3',
                'title' => 'Nuxt 3 入門: はじめての静的サイト',
                'summary' => 'Nuxt 3 で静的サイトを作る基本的な流れを解説します。',
                'content' => '<p>このガイドでは、Nuxt 3 を使って静的サイトを構築する基本を紹介します。ルーティング、レイアウト、プリレンダーの考え方を理解しましょう。</p><h2>セットアップ</h2><p>プロジェクトを作成し、ページとレイアウトを用意します。</p>',
                'tags' => ['nuxt','static','vue'],
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
            [
                'slug' => 'layout-header-sidebar-footer',
                'title' => 'ヘッダー・サイドバー・フッター構成のベストプラクティス',
                'summary' => 'よくある 3 領域レイアウト構成を Nuxt で実装します。',
                'content' => '<p>ヘッダー、左メニュー（サイドバー）、フッターを分離して管理し、<code>layouts/default.vue</code> で組み立てます。</p><ul><li>再利用性の高いコンポーネント</li><li>シンプルな CSS グリッド</li><li>レスポンシブ対応</li></ul>',
                'tags' => ['layout','css','ui'],
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(7),
            ],
            [
                'slug' => 'prerendering-dynamic-routes',
                'title' => '動的ルートのプリレンダー',
                'summary' => 'Nuxt のプリレンダーで動的記事ページを静的化する方法。',
                'content' => '<p>記事一覧からリンクを張ることでクローラが動的ルートを発見できます。必要に応じて <code>nitro.prerender.routes</code> に明示列挙します。</p>',
                'tags' => ['nitro','prerender'],
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(4),
            ],
        ];

        foreach ($data as $row) {
            Article::updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'title' => $row['title'],
                    'summary' => $row['summary'] ?? null,
                    'content' => $row['content'] ?? null,
                    'tags' => $row['tags'] ?? [],
                    'created_at' => $row['created_at'] ?? now(),
                    'updated_at' => $row['updated_at'] ?? now(),
                ]
            );
        }
    }
}
