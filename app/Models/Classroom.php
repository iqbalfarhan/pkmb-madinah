<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;

    // protected $table = 'classrooms';

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
        'description',
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

    public function studentsPivot()
    {
        return $this->belongsToMany(Student::class, 'classroom_student')
                    ->using(ClassroomStudent::class)
                    ->withPivot('academic_year_id')
                    ->withTimestamps();
    }

    public function activeStudents()
    {
        $activeAcademicYear = AcademicYear::active();
        return $this->studentsPivot()->wherePivot('academic_year_id', $activeAcademicYear->id);
    }

    public function assignments()
    {
        return $this->hasManyThrough(Assignment::class, Lesson::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function scopeActive($query)
    {
        $activeAcademicYear = AcademicYear::active();

        return $query->where('academic_year_id', $activeAcademicYear->id);
    }

    public function getDescriptionAttribute()
    {
        return implode(', ', [
            // "Kelas untuk {$this->grade->name}",
            "Tahun ajaran {$this->academic_year->year}",
            // "Walikelas {$this->user?->name}",
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
