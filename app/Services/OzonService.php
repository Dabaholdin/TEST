<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;

use GuzzleHttp\Middleware;

class OzonService
{
    /**
     * @var Client
     */
    private $httpClient;

    public function __construct()
    {
        $this->httpClient = new Client(['base_uri' => config('ozon.api_url')]);
    }

    public function getOzonOrders(): array
    {
        $response = json_decode(
                $this->httpClient->request('POST', 'v3/posting/fbs/list', [
                        'headers' => [
                                'Client-Id' => config('ozon.client_id'),
                                'Api-Key' => config('ozon.api_key')
                        ],
                        'json' => [
                                'dir' => 'DESC',
                                'filter' =>
                                        [
                                                'since' => Carbon::now()->subYears(1)->toIsoString(),
                                                'to' => Carbon::now()->toIsoString(),
                                        ],
                                'limit' => 1000,
                                'offset' => 0,
                                'with' =>
                                        [
                                                'analytics_data' => true,
                                                'financial_data' => true,
                                        ]

                        ],
                ])->getBody()->getContents(),
                true
        );

        return $response['result']['postings'];
    }

    public function getOzonProducts(): array
    {
        $response = json_decode(
                $this->httpClient->request('POST', 'v2/product/list', [
                        'headers' => [
                                'Client-Id' => config('ozon.client_id'),
                                'Api-Key' => config('ozon.api_key')
                        ]
                ])->getBody()->getContents(),
                true
        );

        $products = [];

        foreach ($response['result']['items'] as $item) {
            $products[(int) trim($item['offer_id'])] = $item['product_id'];
        }

        return $products;
    }

    public function updateStocks(array $stocks): string
    {
        return $this->httpClient->request('POST', 'v1/product/import/stocks', [
                'headers' => [
                        'Client-Id' => config('ozon.client_id'),
                        'Api-Key' => config('ozon.api_key')
                ],
                'json' => [
                        'stocks' => $stocks
                ]
        ])->getBody()->getContents();
    }
}
