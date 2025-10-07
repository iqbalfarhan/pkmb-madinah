<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    // protected $table = 'assignments';

    /*
    protected $fillable = [
        'lesson_id',
        'name',
        'description',
        'uploadable',
        'type',
        'rate'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $typeLists = [
        'jurnal',
        'prakarya',
    ];

    public $casts = [
        'uploadable' => 'boolean',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    /*
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
    */
}
