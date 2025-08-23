<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class AcademicYear extends Model
{
    use HasFactory;
    

    //protected $table = 'academic_years';

    /*
    protected $fillable = [
        'year',
        'semester',
        'active'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public $casts = [
        'active' => 'boolean',
    ];

    public function setActive()
    {
        DB::transaction(function(){
            self::where('id', '!=', $this->id)->update(['active' => false]);
    
            $this->active = true;
            $this->save();
        });
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
