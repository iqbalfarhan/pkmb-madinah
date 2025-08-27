<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    /*
    protected $fillable = [
        'student_id',
        'payment_type_id',
        'paid_date',
        'description',
        'total_amount',
        'status',
        'verified'
    ];
    */

    protected $guarded = [
        'id',
        'paid_date',
        'created_at',
        'updated_at',
    ];

    public static $statusLists = [
        'unpaid',
        'partial',
        'paid'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($bill) {
            if ($bill->isDirty('status')) {
                if ($bill->status === 'paid') {
                    $bill->paid_date = now();
                } else {
                    $bill->paid_date = null;
                }
            }
        });
    }
}
