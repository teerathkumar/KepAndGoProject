<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    //
    use HasFactory;
    protected $fillable = ['name','parent_id'];
    protected $perPage = 8;
    public function parent(){
        return $this->belongsTo(Office::class,'parent_id');
    }
}
