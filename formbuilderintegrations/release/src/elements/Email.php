<?php

namespace owldesign\formbuilderintegrations\elements;

use Craft;
use craft\base\Element;
use craft\elements\db\ElementQueryInterface;
use craft\helpers\Json;
use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;
use yii\db\Exception;

use owldesign\formbuilderintegrations\Integrations;
use owldesign\formbuilderintegrations\records\Email as EmailRecord;
use owldesign\formbuilderintegrations\elements\db\EmailQuery;

class Email extends Element
{
    // Properties
    // =========================================================================

    public $id;
    public $title;
    public $handle;
    public $typeId;
    public $enabled;
    public $content;
    public $settings;

    // Public Methods
    // =========================================================================

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
        return true;
    }

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return Integrations::t('Email');
    }

    /**
     * @inheritdoc
     */
    public static function refHandle()
    {
        return 'integrationEmail';
    }

    /**
     * @inheritdoc
     */
    public static function isLocalized(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     * @return EmailQuery The newly created [[EmailQuery]] instance.
     */
    public static function find(): ElementQueryInterface
    {
        return new EmailQuery(static::class);
    }

    /**
     * @inheritdoc
     */
    public function getStatus()
    {
        $status = parent::getStatus();

        if ($status === self::STATUS_ENABLED ) {
            return static::STATUS_ENABLED;
        } else {
            return static::STATUS_DISABLED;

        }
    }

    /**
     * @inheritdoc
     */
    public static function statuses(): array
    {
        return [
            self::STATUS_ENABLED => Integrations::t('Enabled'),
            self::STATUS_DISABLED => Integrations::t('Disabled'),
        ];
    }

    /**
     * @inheritdoc
     */
    public function getCpEditUrl()
    {
        return UrlHelper::cpUrl(
            'formbuilder-integrations/email/'.$this->id
        );
    }

    public function getUrl()
    {
        return UrlHelper::cpUrl(
            'formbuilder-integrations/email/'.$this->id
        );
    }

    /**
     * @inheritdoc
     */
    public function afterSave(bool $isNew)
    {
        if (!$isNew) {
            $record = EmailRecord::findOne($this->id);

            if (!$record) {
                throw new Exception('Invalid integration ID: '.$this->id);
            }
        } else {
            $record = new EmailRecord();
            $record->id = $this->id;
        }

        $record->title = $this->title;
        $record->handle = $this->handle;
        $record->enabled = $this->enabled;
        $record->typeId = $this->typeId;
        $record->content = $this->content;
        $record->settings = $this->settings;

        $record->save(false);

        $this->id = $record->id;

        return parent::afterSave($isNew);
    }

    // Protected
    // -------------------------------------------------------------------------
//    public static function sources(string $context = null): array
//    {
//        return [];
//    }

//    /**
//     * @inheritdoc
//     */
    protected static function defineSources(string $context = null): array
    {
        $sources = [
            [
                'key' => '*',
                'label' => Integrations::t('All Integrations'),
                'criteria' => ['status' => null],
                'hasThumbs' => true
            ]
        ];

//        $types = Integrations::getInstance()->getTypes()->getAllTypes();
//
//        foreach ($types as $type) {
//            $key = 'type:' . $type->id;
//
//            $sources[] = [
//                'key'       => $key,
//                'label'     => Integrations::t($type->title),
//                'data'      => ['id' => $type->id],
//                'criteria'  => ['typeId' => $type->id]
//            ];
//
//        }

        return $sources;
    }

    /**
     * @inheritdoc
     */
    protected static function defineSearchableAttributes(): array
    {
        return ['title', 'handle'];
    }

    /**
     * @inheritdoc
     */
    protected static function defineSortOptions(): array
    {
        $attributes = [
            'formbuilder_integrations_email.title'      => Integrations::t('Title'),
            'formbuilder_integrations_email.handle'     => Integrations::t('Handle'),
            'elements.dateCreated'                      => Integrations::t('Date Created')
        ];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes['title']        = ['label' => Integrations::t('Title')];
        $attributes['handle']       = ['label' => Integrations::t('Handle')];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineDefaultTableAttributes(string $source): array
    {
        $attributes = ['title', 'handle'];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected function tableAttributeHtml(string $attribute): string
    {
//        switch ($attribute) {
//            case 'typeId':
//                $type = Integrations::getInstance()->getTypes()->getTypeById($this->typeId);
//                return $type->title;
//                break;
//        }

        return parent::tableAttributeHtml($attribute);
    }
}