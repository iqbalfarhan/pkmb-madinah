<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Lesson extends Model
{
    use HasFactory;
    

    //protected $table = 'lessons';

    /*
    protected $fillable = [
        'classroom_id',
        'subject_id',
        'user_id'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $appends = ['name', 'description'];

    public function classroom(){
        return $this->belongsTo(Classroom::class);
    }

    public function subject(){
        return $this->belongsTo(Subject::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getNameAttribute()
    {
        return $this->subject->name . ' - ' . $this->classroom->name;
    }

    public function getDescriptionAttribute()
    {
        return implode(" ", [
            'Kelas group',
            'mata pelajaran',
            $this->subject->name,
            'untuk kelas',
            $this->classroom->name,
            'dibimbing oleh',
            $this->user->name
        ]);
    }

    public function materials(){
        return $this->hasMany(Material::class);
    }

    public function assignments(){
        return $this->hasMany(Assignment::class);
    }

    public function exams(){
        return $this->hasMany(Exam::class);
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
