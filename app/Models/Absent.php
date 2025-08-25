<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Absent extends Model
{
    use HasFactory;
    

    //protected $table = 'absents';

    /*
    protected $fillable = [
        'date',
        'student_id',
        'reason',
        'description'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $reasonLists = [
        'tanpa keterangan',
        'sakit',
        'izin',
    ];

    /*
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
    */

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function academic_year()
    {
        return $this->belongsTo(AcademicYear::class);
    }
}
