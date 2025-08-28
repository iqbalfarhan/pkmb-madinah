<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Score extends Model
{
    use HasFactory;
    

    //protected $table = 'scores';

    /*
    protected $fillable = [
        'student_id',
        'lesson_id',
        'assignment_id',
        'score',
        'remark'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $appends = [
        'rated_score'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    public function getRatedScoreAttribute()
    {
        return $this->score != 0 ? ($this->score * $this->assignment->rate) / 100 : 0;
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
