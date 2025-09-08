<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, InteractsWithMedia, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'phone',
        'gender',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public $appends = [
        'avatar',
        'role_lists',
    ];

    public $casts = [
        'gender' => 'boolean',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getAvatarAttribute()
    {
        $firstMedia = $this->getFirstMediaUrl();

        return $firstMedia != '' ? $firstMedia : "https://api.dicebear.com/9.x/dylan/png?seed={$this->email}";
    }

    public function students()
    {
        return $this->hasMany(Student::class)->aktif();
    }

    public function classrooms()
    {
        $active = AcademicYear::active();

        return $this->hasMany(Classroom::class)->whereAcademicYearId($active->id);
    }

    public function lessons()
    {
        $active = AcademicYear::active();

        return $this->hasMany(Lesson::class)->whereHas('classroom', function ($q) use ($active) {
            $q->where('academic_year_id', $active->id);
        });
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function getRoleListsAttribute()
    {
        return $this->getRoleNames(); // langsung return collection of role names
    }
}
