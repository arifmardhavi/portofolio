<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model {
    use HasFactory;
    protected $table = 'educations';
    protected $fillable = [
        'institution_name', 'institution_logo', 'institution_url', 
        'degree', 'major', 'score', 'start_year', 'end_year', 
        'location', 'country_code', 'sort_order'
    ];
}
