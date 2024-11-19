<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    //
    use HasFactory;
    protected $fillable = ['title','body','customer_id','service_id'];
    protected $perPage = 8;
    public function customer(){
        return $this->belongsTo(Customer::class);
    }
    public function service(){
        return $this->belongsTo(Service::class);
    }
}
