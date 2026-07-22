<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model {
    use HasFactory;
    protected $fillable = [
        'company_name', 'company_logo', 'company_url', 'role', 
        'location', 'country_code', 'start_date', 'end_date', 
        'status', 'work_model', 'sort_order'
    ];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
    public function details() {
        return $this->hasOne(CareerDetail::class);
    }
}
