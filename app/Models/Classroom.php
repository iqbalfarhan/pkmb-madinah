<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Classroom extends Model
{
    use HasFactory;
    

    //protected $table = 'classrooms';

    /*
    protected $fillable = [
        'name',
        'academic_year_id',
        'user_id',
        'grade_id'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $appends = [
        'description'
    ];

    public function academic_year()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function getDescriptionAttribute()
    {
        return implode(", ", [
            "Kelas untuk {$this->grade->name}",
            "Tahun ajaran {$this->academic_year->label}",
            "Walikelas {$this->user->name}"
        ]);
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
