<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
  protected $fillable = ['filiere_id', 'nom', 'semestre'];

  public function filiere() {
    return $this->belongsTo(Filiere::class);
  }
}
