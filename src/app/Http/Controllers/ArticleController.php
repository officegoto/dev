<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::query()
            ->orderByDesc('created_at')
            ->get(['slug','title','summary','tags','created_at']);

        return response()->json($articles);
    }

    public function show(string $slug): JsonResponse
    {
        $article = Article::query()
            ->where('slug', $slug)
            ->firstOrFail(['slug','title','summary','content','tags','created_at']);

        return response()->json($article);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:articles,slug'],
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
        ]);

        $article = Article::create([
            'slug' => $data['slug'],
            'title' => $data['title'],
            'summary' => $data['summary'] ?? null,
            'content' => $data['content'] ?? null,
            'tags' => $data['tags'] ?? null,
        ]);

        return response()->json([
            'slug' => $article->slug,
            'title' => $article->title,
            'summary' => $article->summary,
            'content' => $article->content,
            'tags' => $article->tags,
            'created_at' => $article->created_at,
        ], 201);
    }
}


