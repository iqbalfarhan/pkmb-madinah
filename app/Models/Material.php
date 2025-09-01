<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Material extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    

    //protected $table = 'materials';

    /*
    protected $fillable = [
        'lesson_id',
        'title',
        'description',
        'url'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
