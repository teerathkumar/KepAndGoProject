<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    //
    use HasFactory;
    protected $fillable = ['title','lead_id','user_id'];

    public function lead(){
        return $this->belongsTo(Lead::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
