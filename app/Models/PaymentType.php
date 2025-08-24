<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class PaymentType extends Model
{
    use HasFactory;
    

    //protected $table = 'payment_types';

    /*
    protected $fillable = [
        'name',
        'billing_cycle'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public static $defaultCycle = [
        'sekali',
        'bulanan',
        'semester',
        'tahunan'
    ];

    /*
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
    */
}
