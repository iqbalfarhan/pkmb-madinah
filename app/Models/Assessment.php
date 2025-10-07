<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    use HasFactory;

    // protected $table = 'assessments';

    protected $fillable = [
        'group',
        'name',
        'grade_id',
        'semester',
    ];

    // protected $guarded = [
    //     'id',
    //     'created_at',
    //     'updated_at',
    // ];

    public static $groupLists = [
        'doa harian',
        'hadist',
        'gerakan sholat',
        'bacaan sholat',
        'adzan',
        'tata cara wudhu',
    ];

    /*
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
    */

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }
}
