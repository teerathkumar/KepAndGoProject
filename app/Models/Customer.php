<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    use HasFactory;
    protected $fillable = ['name', 'phone', 'address', 'email'];

    protected $perPage = 8;
    public function documents(){
        return $this->hasMany(CustomerDocument::class);
    }
}
