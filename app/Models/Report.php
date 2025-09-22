<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Report extends Model
{
    use HasFactory;

    // protected $table = 'reports';

    /*
    protected $fillable = [
        'classroom_id',
        'academic_year_id',
        'student_id',
        'report_type',
        'data'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $casts = [
        'data' => 'array',
    ];

    public $appends = [
        'name',
    ];

    public static $reportTypes = [
        'nilai',
        'perkembangan',
        'tahfidz',
        'tahsin',
        'doa-hadist',
        'praktik',
    ];

    public function academic_year()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function getNameAttribute()
    {
        $filename = implode(' ', [
            $this->created_at->format('ymdhis'),
            'rapor',
            $this->report_type,
            $this->student->name,
            $this->classroom->name,
            $this->academic_year->label,
        ]);

        return Str::slug($filename);
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
