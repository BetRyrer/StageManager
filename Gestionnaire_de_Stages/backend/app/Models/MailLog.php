<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailLog extends Model
{
    use HasFactory;

    protected $fillable = ['etudiant_id', 'type', 'email', 'sent_at'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
