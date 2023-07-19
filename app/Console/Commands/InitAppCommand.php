<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InitAppCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'App initiation command';

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
        $bar = $this->output->createProgressBar(3);
        $this->info('Migration started:');
        Artisan::call('migrate:fresh');
        $this->info('Migration ended successfully.');
        $bar->advance();

        $this->line('');

        $this->info('Users seed started:');
        Artisan::call('db:seed --class=UsersSeeder');
        $this->info('Users seed ended successfully.');
        $bar->advance();

        $this->line('');

        $this->info('Devices seed started:');
        Artisan::call('db:seed --class=DevicesSeeder');
        $this->info('Devices seed ended successfully.');
        $bar->advance();

        $this->line('');

        $this->info('User devices seed started:');
        Artisan::call('db:seed --class=UserDevicesSeeder');
        $this->info('User devices seed successfully.');
        $bar->finish();
    }
}
