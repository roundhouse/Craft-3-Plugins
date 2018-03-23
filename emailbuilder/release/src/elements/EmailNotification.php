<?php

namespace roundhouse\emailbuilder\elements;

use roundhouse\emailbuilder\EmailBuilder;
use roundhouse\emailbuilder\elements\db\EmailNotificationQuery;

use Craft;
use craft\base\Element;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\db\Query;
use craft\elements\db\ElementQuery;
use craft\elements\db\ElementQueryInterface;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;
use craft\behaviors\FieldLayoutBehavior;
use yii\base\InvalidConfigException;
use yii\base\Exception;

class EmailNotification extends Element
{
    // Properties
    // =========================================================================

    public $name;
    public $handle;
    public $siteId;
    public $statusId;
    public $groupId;
    public $options;
    public $content;
    public $settings;

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return EmailBuilder::t('Email Notification');
    }

    /**
     * @inheritdoc
     */
    public static function hasContent(): bool
    {
        return false;
    }

    /**
     * @inheritdoc
     */
    public static function hasTitles(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public static function hasStatuses(): bool
    {
        return false;
    }

    /**
     * @inheritdoc
     */
    public function getCpEditUrl()
    {
        return UrlHelper::cpUrl(
            'email-builder/emails/'.$this->id
        );
    }

    /**
    * @inheritdoc
    */
    public function __toString(): string
    {
        return (string)$this->name;
    }

    /**
     * @inheritdoc
     */
    public static function statuses(): array
    {
        return [
            self::STATUS_ENABLED => EmailBuilder::t('Enabled'),
            self::STATUS_DISABLED => EmailBuilder::t('Disabled')
        ];
    }

    /**
     * @inheritdoc
     *
     * @return EmailNotificationQuery The newly created [[EmailNotificationQuery]] instance.
     */
    public static function find(): ElementQueryInterface
    {
        return new EmailNotificationQuery(get_called_class());
    }

    public function type(): string
    {
        return 'email';
    }

    public function getPreviewUrl(): string
    {
        return UrlHelper::actionUrl() . '/email-builder/notification/preview-notification';
    }

    public function getUrl(): string
    {
        return UrlHelper::cpUrl('email-builder/notifications/'.$this->id);
    }

    public function getLink()
    {
        return parent::getLink();
    }

    /**
     * @inheritdoc
     */
    protected static function defineSources(string $context = null): array
    {
        $sources = [
            [
                'key'   => '*',
                'label' => EmailBuilder::t('All Notifications')
            ]
        ];

        return $sources;
    }

    /**
     * @inheritdoc
     */
    protected function tableAttributeHtml(string $attribute): string
    {
//        switch ($attribute) {
//            case 'name':
//                break;
//            case 'handle':
//                return '<span class="copy-handle" data-handle="' . $this->handle . '"  data-clipboard-text="' . $this->handle . '">
//                            <code>' . $this->handle . '</code>
//                            <span class="icon">
//                                <i class="far fa-copy"></i>
//                            </span>
//                        </span>';
//                break;
//        }

        return parent::tableAttributeHtml($attribute);
    }

    /**
     * @inheritdoc
     */
    protected static function defineSearchableAttributes(): array
    {
        return ['name', 'handle'];
    }

    /**
     * @inheritdoc
     */
    protected static function defineSortOptions(): array
    {
        $attributes = [
            'emailbuilder_emailnotifications.name'  => EmailBuilder::t('Notification Name'),
            'elements.dateCreated'                  => EmailBuilder::t('Date Created'),
            'elements.dateUpdated'                  => EmailBuilder::t('Date Updated'),
        ];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes['name']         = ['label' => EmailBuilder::t('Name')];
        $attributes['handle']       = ['label' => EmailBuilder::t('Handle')];

        return $attributes;
    }

    protected static function defineDefaultTableAttributes(string $source): array
    {
        $attributes = ['name', 'handle'];

        return $attributes;
    }


    // Events
    // -------------------------------------------------------------------------

    /**
     * @inheritdoc
     */
    public function beforeSave(bool $isNew): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public function afterSave(bool $isNew)
    {
    }

    /**
     * @inheritdoc
     */
    public function beforeDelete(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public function afterDelete()
    {
    }

    /**
     * @inheritdoc
     */
    public function beforeMoveInStructure(int $structureId): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public function afterMoveInStructure(int $structureId)
    {
    }
}