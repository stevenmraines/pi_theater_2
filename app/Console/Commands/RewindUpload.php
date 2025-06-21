<?php

namespace App\Console\Commands;

use App\Episode;
use App\Media;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RewindUpload extends Command
{
    const MOVIE_UPLOAD_TYPE = 'movie';
    const SHOW_UPLOAD_TYPE = 'show';
    const EPISODE_UPLOAD_TYPE = 'episode';
    
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'upload:rewind'
                            . ' { media_or_episode_id : The ID of the movie, show, or episode }'
                            . ' { upload_type=movie : "movie", "show", or "episode" }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Completely undo an upload.'
                            . ' This permanently deletes all associated records such as'
                            . ' collections or genres, poster and jumbotron images,'
                            . ' and the Algolia index.';

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
     * @return mixed
     */
    public function handle()
    {
        /*
         * Validate args.
         */
        $mediaOrEpisodeId = $this->argument('media_or_episode_id');
        $uploadType = $this->argument('upload_type');
        
        $uploadTypes = [
            self::MOVIE_UPLOAD_TYPE,
            self::SHOW_UPLOAD_TYPE,
            self::EPISODE_UPLOAD_TYPE,
        ];
        
        if (! $mediaOrEpisodeId || ! is_numeric($mediaOrEpisodeId)) {
            $this->error("Invalid media or episode ID '$mediaOrEpisodeId'");
            exit(1);
        }
        
        if (! in_array($uploadType, $uploadTypes)) {
            $this->error("Unrecognized upload type '$uploadType'");
            exit(1);
        }
        
        /*
         * Try to get the model.
         */
        $class = $uploadType === self::EPISODE_UPLOAD_TYPE ? Episode::class : Media::class;
        $mediaOrEpisode = $class::find($mediaOrEpisodeId);
        
        if (is_null($mediaOrEpisode)) {
            $this->error("Could not find media or episode model with upload type '$uploadType' and ID '$mediaOrEpisodeId'");
            exit(1);
        }
        
        if ($uploadType !== self::EPISODE_UPLOAD_TYPE && $mediaOrEpisode->media_type !== $uploadType) {
            $this->error("'{$mediaOrEpisode->title}' is a {$mediaOrEpisode->media_type}, not a $uploadType");
            exit(1);
        }
        
        if ($uploadType === self::SHOW_UPLOAD_TYPE && $mediaOrEpisode->episodes->count() > 0) {
            $this->error("'{$mediaOrEpisode->title}' has attached episodes. They must be deleted first if you want to rewind this show.");
            exit(1);
        }
        
        $title = $mediaOrEpisode->title;
        
        if (str_contains(get_class($mediaOrEpisode), 'Episode')) {
            $title = "Season {$mediaOrEpisode->season}, Episode {$mediaOrEpisode->episode_number} - " . $title;
            $title .= " ({$mediaOrEpisode->show->title})";
        }
        
        /*
         * Prompt user to ask if they still want to proceed with the operation.
         */
        $prompt = "Rewinding $uploadType $mediaOrEpisodeId, '$title.' Do you want to continue?";
        
        if (env('APP_ENV', 'production') === 'production') {
            $prompt .= ' REMINDER, YOU ARE IN PRODUCTION!';
        }
        
        if (! $this->confirm($prompt)) {
            $this->line("Aborting rewind");
            exit(0);
        }
        
        $this->line('Proceeding with rewind');
        
        /*
         * Get user confirmation that statements look correct.
         */
        // TODO We really only need to prompt the user once, we should combine these two confirmations
        if ($uploadType === self::MOVIE_UPLOAD_TYPE) {
            $statements = $this->getMovieRewindStatements($mediaOrEpisode);
        } else if ($uploadType === self::SHOW_UPLOAD_TYPE) {
            $statements = $this->getShowRewindStatements($mediaOrEpisode);
        } else {
            $statements = $this->getEpisodeRewindStatements($mediaOrEpisode);
        }
        
        $this->line('Preparing statements');
        
        foreach($statements as $statement) {
            $this->line($statement);
        }
        
        if (! $this->confirm('Do these statements look correct?')) {
            $this->line('Aborting rewind');
            exit(0);
        }
        
        /*
         * Do the rewind.
         */
        if ($uploadType !== self::EPISODE_UPLOAD_TYPE) {
            $this->line('Deleting Algolia index');
            $mediaOrEpisode->unsearchable();
            
            $poster = public_path('/img/posters/' . $mediaOrEpisode->poster);
            $this->line("Deleting poster image $poster");
            exec("rm $poster");
            
            if (! is_null($mediaOrEpisode->jumbotron)) {
                $jumbotron = public_path('/img/jumbotron/' . $mediaOrEpisode->jumbotron);
                $this->line("Deleting jumbotron image $jumbotron");
                exec("rm $jumbotron");
            } else {
                $this->line("No jumbotron image to delete");
            }
        }
        
        foreach ($statements as $statement) {
            $this->line("Running statement: $statement");
            DB::statement($statement);
        }
        
        // TODO It would be cool to add a progress bar to this command...not because it's necessary, but because it would be neat
        $this->line('Rewind complete');
    }
    
    private function getMovieRewindStatements(Media $movie): array
    {
        return [
            "DELETE FROM collection_media WHERE media_id = {$movie->id}",
            "DELETE FROM drive_media WHERE media_id = {$movie->id}",
            "DELETE FROM genre_media WHERE media_id = {$movie->id}",
            "DELETE FROM history_media WHERE media_id = {$movie->id}",
            "DELETE FROM movie_year WHERE media_id = {$movie->id}",
            "DELETE FROM user_watchlist WHERE media_id = {$movie->id}",
            "DELETE FROM media WHERE id = {$movie->id}",
        ];
    }
    
    private function getShowRewindStatements(Media $show): array
    {
        return [
            "DELETE FROM collection_media WHERE media_id = {$show->id}",
            "DELETE FROM genre_media WHERE media_id = {$show->id}",
            "DELETE FROM show_year WHERE media_id = {$show->id}",
            "DELETE FROM user_watchlist WHERE media_id = {$show->id}",
            "DELETE FROM media WHERE id = {$show->id}",
        ];
    }
    
    private function getEpisodeRewindStatements(Episode $episode): array
    {
        return [
            "DELETE FROM drive_episode WHERE episode_id = {$episode->id}",
            "DELETE FROM episode_history WHERE episode_id = {$episode->id}",
            "DELETE FROM episodes WHERE id = {$episode->id}",
        ];
    }
}
