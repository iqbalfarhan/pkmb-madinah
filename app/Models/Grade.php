<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    // protected $table = 'grades';

    /*
    protected $fillable = [
        'group',
        'name',
        'characters'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $defaultGroups = [
        'TK',
        'SD',
        'SMP',
        'SMA',
    ];

    public $casts = [
        'characters' => 'array'
    ];

    /*
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
    */

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }

    public function classrooms()
    {
        return $this->hasMany(Classroom::class);
    }


}
