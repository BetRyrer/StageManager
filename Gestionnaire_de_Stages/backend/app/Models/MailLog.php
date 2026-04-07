<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailLog extends Model
{
    protected $fillable = [
        'etudiant_id',
        'type',
        'email',
        'subject',
        'body_snapshot',
        'cc',
        'status',
        'retry_count',
        'error_message',
        'sent_at',
    ];

    protected $casts = [
        'cc'      => 'array',
        'sent_at' => 'datetime',
    ];

    // Relation
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    // Scopes utiles
    public function scopePending($query)  { return $query->where('status', 'pending'); }
    public function scopeSent($query)     { return $query->where('status', 'sent'); }
    public function scopeFailed($query)   { return $query->where('status', 'failed'); }
}