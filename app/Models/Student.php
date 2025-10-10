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
    use InteractsWithMedia;
    use SoftDeletes;

    // protected $table = 'students';

    private ?AcademicYear $active = null;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->active = AcademicYear::active()->first();
    }

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
        'user_id',
    ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $statusLists = [
        'draft',
        'ppdb',
        'aktif',
        'dikeluarkan',
        'lulus',
        'pindah',
    ];

    public $appends = ['kelahiran', 'umur', 'avatar', 'alamat'];

    public $casts = [
        'gender' => 'boolean',
        'address' => 'array',
    ];

    public function getAlamatAttribute()
    {
        $parts = [
            'Jalan',
            $this->address['jalan'] ?? '',
        ];

        if (! empty($this->address['dusun'])) {
            $parts[] = 'Dusun';
            $parts[] = $this->address['dusun'];
        }

        $parts[] = 'RT';
        $parts[] = $this->address['rt'] ?? '';

        if (! empty($this->address['rw'])) {
            $parts[] = 'RW';
            $parts[] = $this->address['rw'];
        }

        $parts[] = 'Kel.';
        $parts[] = $this->address['kelurahan'] ?? '';
        $parts[] = $this->address['kodepos'] ?? '';
        $parts[] = 'Kec.';
        $parts[] = $this->address['kecamatan'] ?? '';
        $parts[] = 'Kota';
        $parts[] = $this->address['kota'] ?? '';
        $parts[] = ',';
        $parts[] = $this->address['provinsi'] ?? '';

        return implode(' ', array_filter($parts, 'strlen'));
    }

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

    public function scopeLulus($query)
    {
        return $query->where('status', 'lulus');
    }

    public function scopeDikeluarkan($query)
    {
        return $query->where('status', 'dikeluarkan');
    }

    public function scopePindah($query)
    {
        return $query->where('status', 'pindah');
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

    public function absents()
    {
        return $this->hasMany(Absent::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function getKelahiranAttribute()
    {
        return $this->pob.', '.Carbon::parse($this->dob)->format('d F Y');
    }

    public function getUmurAttribute()
    {
        $diff = date_diff(date_create($this->dob), date_create('now'));

        return $diff->y.' tahun '.$diff->m.' bulan';
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
        $photo = $this->getFirstMediaUrl('photo siswa');

        return $photo ?: 'https://api.dicebear.com/9.x/dylan/png?seed='.$this->name;
    }
}
