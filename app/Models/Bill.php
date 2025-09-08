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
        'paid',
    ];

    public $appends = [
        'total_paid',
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

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function payment_type()
    {
        return $this->belongsTo(PaymentType::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function getTotalPaidAttribute()
    {
        return $this->payments ? $this->payments->where('verified', true)->sum('amount') : 0;
    }

    public function refreshStatus()
    {
        $status = match (true) {
            $this->total_paid == 0 => 'unpaid',
            $this->total_paid >= $this->total_amount => 'paid',
            default => 'partial',
        };

        $this->update(['status' => $status]);
    }
}
