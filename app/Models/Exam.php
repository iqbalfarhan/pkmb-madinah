<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Exam extends Model
{
    use HasFactory;
    

    //protected $table = 'exams';

    /*
    protected $fillable = [
        'lesson_id',
        'name',
        'rate',
        'description',
        'academic_year_id',
        'classroom_id'
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

    public function academic_year()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function examscores()
    {
        return $this->hasMany(Examscore::class);
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
