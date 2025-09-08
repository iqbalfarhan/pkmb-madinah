<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    // protected $table = 'families';

    /*
    protected $fillable = [
        'student_id',
        'father_name',
        'father_ocupation',
        'father_address',
        'father_phone',
        'father_sallary',
        'mother_name',
        'mother_ocupation',
        'mother_address',
        'mother_phone',
        'mother_sallary'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $sallaryLists = [
        'Tidak ada penghasilan',
        'Rp. 0 ~ Rp. 5.000.000',
        'Rp. 5.000.000 ~ Rp. 10.000.000',
        'Rp. 10.000.000 ~ Rp. 15.000.000',
        'Rp. 15.000.000 ~ Rp. 20.000.000',
        'Rp. 20.000.000 ~ Rp. 25.000.000',
        'Rp. 25.000.000 ~ Rp. 30.000.000',
        'Lebih dari Rp. 30.000.000',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
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
