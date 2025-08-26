<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Student extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;
    use InteractsWithMedia;


    //protected $table = 'students';

    /*
    protected $fillable = [
        'nisn',
        'nis',
        'name',
        'gender',
        'status',
        'address',
        'grade_id',
        'classroom_id',
        'phone',
        'email',
        'pob',
        'dob',
        'user_id'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $statusLists = ['draft', 'ppdb', 'aktif', 'dikeluarkan', 'lulus', 'pindah'];

    public $appends = ['kelahiran', 'umur', 'avatar'];
    public $casts = [
        'gender' => 'boolean',
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopePpdb($query)
    {
        return $query->where('status', 'ppdb');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function getKelahiranAttribute()
    {
        return $this->pob . ', ' . Carbon::parse($this->dob)->format('d F Y');
    }

    public function getUmurAttribute()
    {
        return date_diff(date_create($this->dob), date_create('now'))->y . ' tahun';
    }

    public function family()
    {
        return $this->hasOne(Family::class);
    }

    public function prevschool()
    {
        return $this->hasOne(Prevschool::class);
    }

    public function getAvatarAttribute()
    {
        return "https://api.dicebear.com/9.x/dylan/png?seed=" . $this->name;
    }
}
