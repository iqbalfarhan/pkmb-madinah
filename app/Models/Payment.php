<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Payment extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    

    //protected $table = 'payments';

    /*
    protected $fillable = [
        'bill_id',
        'amount',
        'verified',
        'remark'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $appends = [
        'code'
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function getCodeAttribute()
    {
        return "#".$this->created_at->format('YmdHis');
    }
}
