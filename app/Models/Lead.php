<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    //
    use HasFactory;
    protected $fillable = ['title','body','customer_id','service_id'];
}
