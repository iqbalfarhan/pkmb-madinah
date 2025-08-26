<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Prevschool extends Model
{
    use HasFactory;
    

    //protected $table = 'prevschools';

    /*
    protected $fillable = [
        'student_id',
        'name',
        'address'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
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
}
