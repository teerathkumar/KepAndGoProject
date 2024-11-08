<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerDocument extends Model
{
    //
    use HasFactory;
    protected $fillable = ['customer_id', 'file_name','description', 'parent_id', 'is_folder', 'file_type','creator_id', 'is_favorite', 'file_size', 'file_path'];
    public function customer(){
        return $this->belongsTo(Customer::class);
    }
    public function parent(){
        return $this->belongsTo(CustomerDocument::class, 'parent_id');
    }
    public function children(){
        return $this->hasMany(CustomerDocument::class, 'parent_id');
    }
    public function childrenRecursive(){
        return $this->children()->with('childrenRecursive');
    }
    public function creator(){
        $this->belongsTo(User::class, 'creator_id');
    }
}
