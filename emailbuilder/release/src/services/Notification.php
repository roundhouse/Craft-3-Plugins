<?php

namespace roundhouse\emailbuilder\services;

use Craft;
use craft\base\Component;
use craft\helpers\Json;
use craft\helpers\ArrayHelper;

use roundhouse\formbuilder\elements\Form as FormElement;
use roundhouse\formbuilder\elements\Entry as EntryElement;
use roundhouse\emailbuilder\elements\EmailNotification;
use roundhouse\emailbuilder\records\EmailNotification as NotificationRecord;
use roundhouse\emailbuilder\errors\FormNotFoundException;

class Notification extends Component
{
    // Properties
    // =========================================================================

    protected $notificationRecord;

    private $_allTemplates;
    private $_templatesById;

    // Public Methods
    // =========================================================================

    public function getTemplates()
    {
        if ($this->_allTemplates !== null) {
            return $this->_allTemplates;
        }

        $this->_allTemplates = EmailNotification::findAll();
        $this->_templatesById = ArrayHelper::index($this->_allTemplates, 'id');

        return $this->_allTemplates;
    }

    public function prepareNotification(FormElement $form, EntryElement $entry, $notifications)
    {
        Craft::dd($notifications);
    }

    public function getNotificationById(int $elementId, int $siteId = null)
    {
        if ($this->_templatesById !== null && array_key_exists($elementId, $this->_templatesById)) {
            return $this->_templatesById[$elementId];
        }

        $templateRecord = NotificationRecord::find()
            ->where([
                'id' => $elementId,
                'siteId' => $siteId
            ])
            ->one();

        if ($templateRecord === null) {
            return $this->_templatesById[$elementId] = null;
        }

        return $this->_templatesById[$elementId] = $this->_createNotificationFromRecord($templateRecord);

    }

    public function save(EmailNotification $notification): bool
    {
        $isNewNotification = !$notification->id;

        if (!$isNewNotification) {
            $notificationRecord = NotificationRecord::findOne($notification->id);

            if (!$notificationRecord) {
                throw new NotificationNotFoundException("No notification exists with the ID '{$notification->id}'");
            }
        } else {
            $notificationRecord = new NotificationRecord();
        }

        $notification->validate();

        if ($notification->hasErrors()) {
            return false;
        }

        $notificationRecord->name = $notification->name;
        $notificationRecord->handle = $notification->handle;
        $notificationRecord->siteId = $notification->siteId;
        $notificationRecord->options = Json::encode($notification->options);
        $notificationRecord->content = Json::encode($notification->content);
        $notificationRecord->settings = Json::encode($notification->settings);

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {

            if (!Craft::$app->getElements()->saveElement($notification, false)) {
                throw new Exception('Couldn’t save the notification.');
            }

            if ($isNewNotification) {
                $notificationRecord->id = $notification->id;
            }

            $notificationRecord->save(false);

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    private function _createNotificationFromRecord(NotificationRecord $notificationRecord = null)
    {
        if (!$notificationRecord) {
            return null;
        }

        $notification = new EmailNotification($notificationRecord->toArray([
            'id',
            'name',
            'handle',
            'group',
            'status',
            'options',
            'content',
            'settings'
        ]));

        $notification->options = Json::decode($notification->options);
        $notification->content = Json::decode($notification->content);
        $notification->settings = Json::decode($notification->settings);

        return $notification;
    }
}