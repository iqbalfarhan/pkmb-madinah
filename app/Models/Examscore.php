<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examscore extends Model
{
    use HasFactory;

    // protected $table = 'examscores';

    /*
    protected $fillable = [
        'student_id',
        'exam_id',
        'score',
        'remark'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function getRatedScoreAttribute()
    {
        return $this->score != 0 ? ($this->score * $this->exam->rate) / 100 : 0;
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
