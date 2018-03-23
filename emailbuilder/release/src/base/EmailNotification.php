<?php

namespace roundhouse\emailbuilder\base;

abstract class EmailNotification implements EmailNotificationInterface
{
    public function fromEmail(): string
    {
        // TODO: set to system email
        return 'vadim@owl-design.net';
    }

    public function fromName(): string
    {
        return 'Vadim Goncharov';
    }

    public function toEmail(): string
    {
        return 'vadim@roundhouseagency.com';
    }

    public function subject(): string
    {
        return 'You got mail!';
    }

    public function attachments(): bool
    {
        return false;
    }

    public function cc(): array
    {
        return [];
    }

    public function replyTo(): string
    {
        return $this->fromEmail();
    }

    public function template(EmailNotification $notification = null)
    {
        return $notification;
    }
}
