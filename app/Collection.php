<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
//use Laravel\Scout\Searchable;

class Collection extends Model
{
//    use Searchable;
    
    protected $fillable = ['name'];

    public function media() {
        return
            $this
                ->belongsToMany('App\Media')
                ->orderBy('media.title', 'asc');
    }

    public static function recent($limit) {
        $collectionMedia =
            DB::table('collection_media')
                ->selectRaw('collection_id, max(created_at) as created_at')
                ->groupBy('collection_id')
                ->get();

        $collectionMedia = $collectionMedia->sort(function($a, $b) {
            if($a->created_at === $b->created_at) {
                return 0;
            }
            return ($a->created_at > $b->created_at) ? -1 : 1;
        });

        $ids = $collectionMedia->values()->take($limit)->pluck('collection_id')->toArray();

        return self::findMany($ids)->toArray();
    }
}
