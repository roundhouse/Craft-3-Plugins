<?php

namespace owldesign\formbuilderintegrations\services;

use Craft;
use craft\base\Component;
use craft\fields\Assets;
use craft\mail\Message;
use craft\models\MailSettings;

use owldesign\formbuilderintegrations\Integrations as Plugin;
use owldesign\formbuilderintegrations\elements\Email;

class Integrations extends Component
{
    // Properties
    // =========================================================================

    public $recipient;
    public $subject;
    public $replyTo;
    public $cc;
    public $bcc;

    // Public Methods
    // =========================================================================

    public function performIntegrations($submission, $form)
    {
        // TODO: only send notifications if the notification is enabled

        $integrations = $form->integrations;

        foreach ($integrations as $type => $integration) {

            if ($type == 'email') {
                foreach ($integration as $item) {
                    $notification = isset($item['elementId']) ? Craft::$app->elements->getElementById($item['elementId']) : null;
                    $view = Craft::$app->view;

                    if ($notification->enabled != '1') {
                        // TODO: maybe add some functionality to let admin know notification was disabled, so no email went out?
                    } else {
                        $fields = $submission->getFieldLayout()->getFields();
                        $this->recipient = $this->_getRecipient($submission, $item);
                        $this->subject = $this->_getSubject($submission, $item);
                        $this->replyTo = $this->_getReplyToRecipient($submission, $item);
                        $this->cc = $this->_getCcRecipients($item);
                        $this->bcc = $this->_getBccRecipients($item);

                        $email = new Message();
                        $email->setTo($this->recipient)
                            ->setFrom([$item['fromEmail'] => $item['fromName']])
                            ->setSubject($this->subject)
                            ->setHtmlBody($view->renderString(Plugin::getInstance()->getEmails()->getBodyHtml($notification, $fields, $submission)))
                            ->setTextBody($view->renderString(Plugin::getInstance()->getEmails()->getBodyText($notification, $fields, $submission)))
                            ->setReplyTo($this->replyTo);

                        if ($this->cc) {
                            $email->setCc($this->cc);
                        }

                        if ($this->bcc) {
                            $email->setBcc($this->bcc);
                        }

                        if (isset($item['attachments']['enabled']) && $item['attachments']['enabled'] == '1') {
                            foreach ($fields as $field) {
                                if ($field instanceof Assets) {
                                    $handle = $field->handle;
                                    $value = $submission->$handle;
                                    $asset = $value->one();

                                    if ($asset) {
                                        $email->attach($asset->getTransformSource());
                                    }
                                }
                            }
                        }

                        Craft::$app->mailer->send($email);
                    }
                }
            }
        }
    }

    /**
     * Get integration by id
     *
     * @param $id
     * @return \craft\base\ElementInterface|null
     */
    public function getIntegrationById($id)
    {
        return Craft::$app->elements->getElementById($id);
    }

    public function getAllIntegrations()
    {
        // Email
        $emailTypeQuery = Email::findAll(['status' => null]);

        $elements = $emailTypeQuery;

        return $elements;
    }

    // Private Methods
    // =========================================================================

    /**
     * Get mail recipient
     *
     * @param $entry
     * @param $item
     * @return array
     */
    private function _getRecipient($entry, $item)
    {
        $toEmail = [];

        if (isset($item['toEmail']['selected']) && $item['toEmail']['selected'] == 'email') {
            $toEmail[] = isset($item['toEmail']['email']) ? $item['toEmail']['email'] : null;
        } elseif (isset($item['toEmail']['selected']) && $item['toEmail']['selected'] == 'field') {
            $field = isset($item['toEmail']['field']) ? $item['toEmail']['field'] : null;
            if ($field) {
                $toEmail[] = $entry->$field;
            } else {
                $toEmail[] = null;
            }
        }

        return $toEmail;
    }

    private function _getReplyToRecipient($entry, $item)
    {
        $toEmail = [];

        if (isset($item['replyTo']['selected']) && $item['replyTo']['selected'] == 'email') {
            $toEmail[] = isset($item['replyTo']['email']) ? $item['replyTo']['email'] : null;
        } elseif (isset($item['replyTo']['selected']) && $item['replyTo']['selected'] == 'field') {
            $field = isset($item['replyTo']['field']) ? $item['replyTo']['field'] : null;
            if ($field) {
                $toEmail[] = $entry->$field;
            } else {
                $toEmail[] = null;
            }
        }

        return $toEmail;
    }

    /**
     * Get subject
     *
     * @param $entry
     * @param $item
     * @return null|string
     */
    private function _getSubject($entry, $item)
    {
        $subject = '';

        if (isset($item['subject']['selected']) && $item['subject']['selected'] == 'text') {
            $subject = isset($item['subject']['text']) ? $item['subject']['text'] : null;
        } elseif (isset($item['subject']['selected']) && $item['subject']['selected'] == 'field') {
            $field = isset($item['subject']['field']) ? $item['subject']['field'] : null;
            if ($field) {
                $subject = $entry->$field;
            } else {
                $subject = null;
            }
        }

        return $subject;
    }

    /**
     * Get CC Recipients
     *
     * @param $item
     * @return null
     */
    private function _getCcRecipients($item)
    {
        $recipients = [];

        if (isset($item['cc']) && is_array($item['cc'])) {
            foreach ($item['cc'] as $recipient) {
                $recipients[] = $recipient['value'];
            }

            return $recipients;
        } else {
            return null;
        }
    }

    /**
     * Get BCC Recipients
     *
     * @param $item
     * @return null
     */
    private function _getBccRecipients($item)
    {
        $recipients = [];

        if (isset($item['bcc']) && is_array($item['bcc'])) {
            foreach ($item['bcc'] as $recipient) {
                $recipients[] = $recipient['value'];
            }

            return $recipients;
        } else {
            return null;
        }
    }

    private function _createMailSettings($item): MailSettings
    {
        $settings = new MailSettings();
        $settings->fromEmail = $item['fromEmail'];
        $settings->fromName = $item['fromName'];
        $settings->template = 'formbuilder-integrations/types/email/emailtemplates/basic-responsive';
        $settings->transportType = Craft::$app->systemSettings->getEmailSettings()->transportType;
        $settings->transportSettings = Craft::$app->systemSettings->getEmailSettings()->transportSettings;

        return $settings;
    }
}