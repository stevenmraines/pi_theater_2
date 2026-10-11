<?php

namespace App\Utilities;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Cache;

class IMDbClient
{
    /** @var Client */
    private $http;

    /** @var string */
    private $key;

    private const QUOTA_FLAG_KEY = 'imdb:quota_exceeded';

    public function __construct(Client $http, string $key) {
        if (empty($key)) {
            throw new \RuntimeException('IMDb API key not found.');
        }
        
        $this->key = $key;
        $this->http = $http;
    }

    /**
     * Returns the auto-complete response, or null if it couldn't be fetched.
     */
    public function autoComplete(string $title): ?array
    {
        $cacheKey = 'imdb:autocomplete:' . md5(mb_strtolower($title));
        $cached = Cache::get($cacheKey);

        if ($cached !== null) {
            return $cached;
        }

        if (Cache::has(self::QUOTA_FLAG_KEY)) {
            return null;
        }

        try {
            $response = $this->http->get('https://imdb8.p.rapidapi.com/title/auto-complete', [
                'http_errors' => false, // let us inspect 400 or 500 error codes instead of throwing
                'headers' => [
                    'X-RapidAPI-Host' => 'imdb8.p.rapidapi.com',
                    'X-RapidAPI-Key'  => $this->key,
                ],
                'query' => ['q' => $title],
            ]);
        } catch (GuzzleException $e) {
            report($e);
            return null;
        }

        $status = $response->getStatusCode();

        if ($status === 429) {
            Cache::put(self::QUOTA_FLAG_KEY, true, now()->addHour());
            return null;
        }

        if ($status !== 200) {
            return null;
        }

        $data = json_decode((string) $response->getBody(), true);

        if (! is_array($data)) {
            return null;
        }

        Cache::put($cacheKey, $data, now()->addDays(30));

        return $data;
    }

    public static function quotaExceeded(): bool
    {
        return Cache::has(self::QUOTA_FLAG_KEY);
    }
}
