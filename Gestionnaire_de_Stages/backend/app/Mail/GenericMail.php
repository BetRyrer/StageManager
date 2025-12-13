<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GenericMail extends Mailable
{
    use SerializesModels;

    public string $content;

    public function __construct(string $content)
    {
        $this->content = $content;
    }

    public function build()
    {
        return $this
            ->subject('Message – StageManager')
            ->view('emails.generic');
    }
}
