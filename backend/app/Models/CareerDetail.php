<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerDetail extends Model {
    use HasFactory;
    protected $fillable = ['career_id', 'responsibilities', 'what_i_learned', 'impact'];
    protected $casts = [
        'responsibilities' => 'array',
        'what_i_learned' => 'array',
        'impact' => 'array',
    ];
    public function career() {
        return $this->belongsTo(Career::class);
    }
}
