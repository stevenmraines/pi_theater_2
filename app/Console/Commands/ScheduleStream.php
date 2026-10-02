<?php

namespace App\Console\Commands;

use App\Stream;
use App\StreamMedia;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ScheduleStream extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stream:schedule
                            {stream_id=0 : The ID of the stream (0 to schedule all streams)}
                            {date=today : The date of the stream}
                            {--H|ignore_history : If this is set, previous streams will not be considered when scheduling media}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Schedule one or more live streams for a given date, or the current day by default';

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
        $streamId = $this->argument('stream_id');
        $date = Carbon::parse($this->argument('date'))->format('Y-m-d');
        $lookBackDate = Carbon::parse($date)->subDays(StreamMedia::DAYS_OF_UNIQUE_MEDIA)->format('Y-m-d');
        $ignoreHistory = $this->option('ignore_history');
        $streams = Stream::all();

        // Delete any streamed media older than DAYS_OF_UNIQUE_MEDIA number of days
        StreamMedia::where('date', '<', $lookBackDate)->delete();

        if ($streamId > 0) {
            $stream = Stream::find($streamId);

            if (! $stream) {
                $this->error("Could not find stream with ID $streamId");
                return;
            }

            $streams = collect([$stream]);
        } else {
            $streams = Stream::all();
        }

        foreach ($streams as $stream) {
            $this->info("Scheduling stream \"{$stream->name}\" (ID {$stream->id}) for $date...");

            // Delete any content already scheduled for this stream on this date
            StreamMedia::where('stream_id', $stream->id)->where('date', '=', $date)->delete();

            $pastStreams = StreamMedia::where('stream_id', $stream->id)->where('date', '>=', $lookBackDate)->get();
            $allMedia = $stream->getMedia();
            $cumRuntime = 0; // In seconds
            $streamMedia = [];
            $i = 0;
            $maxAttempts = $allMedia->count() * 50;
            $attempts = 0;
            $collectionStreamIndex = 0;
            $lastScheduledMediaAccountedFor = false;

            if ($allMedia->isEmpty()) {
                $this->error("No media found for stream with ID {$stream->id}");
                continue;
            }

            while ($cumRuntime < 60 * 60 * 24) {

                if ($stream->type === 'random') {
                    if (++$attempts > $maxAttempts) {
                        $this->error("Ran out of unique media to schedule");
                        break;
                    }

                    /*
                    * Use current day as a hash to get a random entry from the collection.
                    * $i is needed because otherwise $index will be the same for each iteration of the loop.
                    */
                    $count = $allMedia->count();
                    $hash = crc32($date . '-' . $i);
                    $i++;
                    $index = (($hash % $count) + $count) % $count;
                    $entry = $allMedia->get($index)->load('drive');

                    if (collect($streamMedia)->pluck('media_id')->contains($entry->id)) {
                        continue;
                    }

                    if (! $ignoreHistory && $pastStreams->pluck('media_id')->contains($entry->id)) {
                        continue;
                    }

                    $streamMedia[] = StreamMedia::create([
                        'stream_id' => $stream->id,
                        'media_id' => $entry->id,
                        'date' => $date,
                    ]);

                    // TODO This doesn't take previous stream day overlap into account
                    $cumRuntime += $entry->drive->first()->pivot->duration;

                    $this->line("Scheduled {$entry->title}");
                }

                if ($stream->type === 'collection') {
                    $lastScheduledMedia = StreamMedia::where('stream_id', $stream->id)
                        ->whereDate('date', Carbon::parse($date)->subDay()->toDateString())
                        ->orderBy('id', 'desc')
                        ->first();
                    
                    if ($lastScheduledMedia && ! $ignoreHistory) {
                        // Schedule in order starting from last scheduled media
                        $indexOfLastScheduledMedia = $allMedia->search(function ($item, $key) use ($lastScheduledMedia) {
                            return $item->id == $lastScheduledMedia->media_id;
                        });

                        if (! $lastScheduledMediaAccountedFor && $indexOfLastScheduledMedia && $indexOfLastScheduledMedia + 1 < $allMedia->count()) {
                            $lastScheduledMediaAccountedFor = true;
                            $collectionStreamIndex = $indexOfLastScheduledMedia + 1;
                        } else if (! $lastScheduledMediaAccountedFor) {
                            $lastScheduledMediaAccountedFor = true;
                            $collectionStreamIndex = 0;
                        }
                    }

                    if ($collectionStreamIndex < $allMedia->count()) {
                        $entry = $allMedia->get($collectionStreamIndex)->load('drive');

                        $streamMedia[] = StreamMedia::create([
                            'stream_id' => $stream->id,
                            'media_id' => $entry->id,
                            'date' => $date,
                        ]);

                        $this->line("Scheduled {$entry->title}");
                        
                        $cumRuntime += $entry->drive->first()->pivot->duration;
                        
                        $collectionStreamIndex++;
                    } else {
                        $this->info("Reached end of collection, resetting \$collectionStreamIndex and starting over from beginning");
                        $collectionStreamIndex = 0;
                    }
                }
            }
        }
    }
}
