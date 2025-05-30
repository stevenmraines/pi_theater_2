<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

/*
 * You'll need an SSH key in order for this to work, because of the scp command.
 */
class SyncProductionDatabase extends Command
{
    protected $signature = 'db:sync-from-prod {--host=} {--user=}';
    protected $description = 'Pull the latest prod database and import locally';

    public function handle()
    {
        if (env('APP_ENV', 'production') === 'production') {
            $this->error("Attempting to run db:sync-from-prod in production! This command should only be run locally.");
            return 1;
        }

        $host = $this->option('host') ?? '192.168.1.204';
        $user = $this->option('user') ?? 'pi';
        $remotePath = '/var/www/pi_theater_2/storage/dumps/dump.sql';
        $localPath = storage_path('dumps/update_dev_database.sql');
        
        $dumpPath = storage_path('dumps');
        if (!file_exists($dumpPath)) {
            mkdir($dumpPath, 0755, true);
        }

        // Step 1: Pull the file with scp
        $this->info("Pulling database dump from {$user}@{$host}...");
        $scpCmd = "scp {$user}@{$host}:{$remotePath} {$localPath}";
        exec($scpCmd, $scpOutput, $scpExit);

        if ($scpExit !== 0) {
            $this->error("Failed to fetch remote dump file.");
            return 1;
        }

        // Step 2: Run migrate:fresh to wipe the DB
        $this->call('migrate:fresh');

        // Step 3: Import into local DB
        $database = Config::get('database.connections.mysql.database');
        $username = Config::get('database.connections.mysql.username');
        $password = Config::get('database.connections.mysql.password');
        $mysqlCmd = "mysql -u {$username} -p\"{$password}\" {$database} < {$localPath}";

        $this->info("Importing database into local DB...");
        exec($mysqlCmd, $mysqlOutput, $mysqlExit);

        if ($mysqlExit !== 0) {
            $this->error("Database import failed.");
            return 1;
        }

        $this->info("Local database updated successfully.");
        return 0;
    }
}
