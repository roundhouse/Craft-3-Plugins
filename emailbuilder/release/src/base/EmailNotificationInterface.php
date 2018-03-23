<?php

namespace roundhouse\emailbuilder\base;

interface EmailNotificationInterface extends BaseInterface
{
    public function fromEmail(): string;

    public function fromName(): string;

    public function toEmail(): string;

    public function replyTo(): string;

    public function subject(): string;

    public function template(EmailNotification $notification = null);

    public function attachments(): bool;

    public function cc(): array;

}