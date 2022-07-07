<?php

namespace App\Console\Commands;

use App\Connections\OldAutolongDatabase;
use App\ExchangeRate;
use App\Product;
use Illuminate\Console\Command;

class SyncProductsWith1C extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync products from 1C';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $exchangeRate = ExchangeRate::query()->orderByDesc('created_at')->first();
        $limit = 500;
        $offset = 0;

        $products1c = OldAutolongDatabase::getProducts($limit, $offset);

        while(count($products1c) > 0)
        {
            $this->info('Parsing products offset: ' . $offset . ' limit: ' . $limit);

            try{
                $this->parseProductsBatch($products1c, $exchangeRate);
            } catch (\Exception $exception) {
                $this->info($exception->getMessage());
                $this->info($exception->getTraceAsString());

                return 0;
            }

            $offset += $limit;
            $products1c = OldAutolongDatabase::getProducts($limit, $offset);
        }

        return 0;
    }

    private function parseProductsBatch(array $products1c, $exchangeRate)
    {
        Product::withoutEvents(function () use ($products1c, $exchangeRate) {
            foreach ($products1c as $product1c) {
                if (Product::query()->where('autolong_number', $product1c->number)->doesntExist()) {
                    $product = new Product();
                    $product->autolong_number = $product1c->number;
                    $product->name_ru = $product1c->name;
                    $product->price_rub = $product1c->price;
                    $product->price_cny = $product->price_rub / $exchangeRate->rub;
                    $product->price_usd = $product->price_cny * $exchangeRate->usd;
                    $product->vendor_code = $product1c->articul;
                    $product->image = $product1c->photo;
                    $product->provider()->associate(config('app.default_products_provider_id'));
                } else {
                    $product = Product::query()->where('autolong_number', $product1c->number)->first();
                    $product->name_ru = $product1c->name;
                    $product->price_rub = $product1c->price;
                    $product->price_cny = $product->price_rub / $exchangeRate->rub;
                    $product->price_usd = $product->price_cny * $exchangeRate->usd;
                    $product->image = $product1c->photo;
                }

                $product->save();
                unset($product);
            }
        });
    }
}
