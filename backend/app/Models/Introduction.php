<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Introduction extends Model {
    use HasFactory;
    protected $fillable = ['content', 'is_active'];
    protected $casts = [
        'content' => 'array',
        'is_active' => 'boolean'
    ];
}
