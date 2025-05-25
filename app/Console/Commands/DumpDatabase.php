<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class DumpDatabase extends Command
{
    protected $signature = 'db:dump';
    protected $description = 'Dump the current database to storage/dumps/dump.sql';

    public function handle()
    {
        $database = Config::get('database.connections.mysql.database');
        $username = Config::get('database.connections.mysql.username');
        $password = Config::get('database.connections.mysql.password');
        $host = Config::get('database.connections.mysql.host');

        $dumpPath = storage_path('dumps');
        if (!file_exists($dumpPath)) {
            mkdir($dumpPath, 0755, true);
        }
        $outputFile = $dumpPath . '/dump.sql';

        $cmd = "mysqldump -h {$host} -u {$username} -p\"{$password}\" --no-create-info --ignore-table={$database}.migrations {$database} > {$outputFile}";

        $this->info("Dumping database to {$outputFile}");
        exec($cmd, $output, $exitCode);

        if ($exitCode !== 0) {
            $this->error("Database dump failed.");
            return 1;
        }

        $this->info("Database dump completed successfully.");
        return 0;
    }
}
