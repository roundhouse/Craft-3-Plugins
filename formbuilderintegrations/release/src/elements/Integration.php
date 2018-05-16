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
use owldesign\formbuilderintegrations\elements\db\IntegrationQuery;
use owldesign\formbuilderintegrations\records\Integration as IntegrationRecord;

class Integration extends Element
{
    // Properties
    // =========================================================================

    public $id;
    public $title;
    public $typeId;
    public $entryId;
    public $formId;
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
        return false;
    }

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return Integrations::t('Integration');
    }

    /**
     * @inheritdoc
     */
    public static function refHandle()
    {
        return 'integration';
    }

    /**
     * @inheritdoc
     */
    public static function isLocalized(): bool
    {
        return false;
    }

    /**
     * @inheritdoc
     * @return IntegrationQuery The newly created [[IntegrationQuery]] instance.
     */
    public static function find(): ElementQueryInterface
    {
        return new IntegrationQuery(static::class);
    }

    /**
     * @inheritdoc
     */
//    public function getStatus()
//    {
//        $status = parent::getStatus();
//
//        if ($status === self::STATUS_ENABLED ) {
//            return static::STATUS_ENABLED;
//        } else {
//            return static::STATUS_DISABLED;
//
//        }
//    }

    /**
     * @inheritdoc
     */
//    public static function statuses(): array
//    {
//        return [
//            self::STATUS_ENABLED => Integrations::t('Enabled'),
//            self::STATUS_DISABLED => Integrations::t('Disabled'),
//        ];
//    }

    /**
     * @inheritdoc
     */
    public function getCpEditUrl()
    {
        $type = Integrations::getInstance()->getTypes()->getTypeById($this->typeId);
        $typeHande = StringHelper::toSnakeCase($type->title);

        return UrlHelper::cpUrl(
            'formbuilder-integrations/integrations/'.$typeHande.'/'.$this->id
        );
    }

    /**
     * @inheritdoc
     */
//    public function afterSave(bool $isNew)
//    {
//        if (!$isNew) {
//            $record = IntegrationRecord::findOne($this->id);
//
//            if (!$record) {
//                throw new Exception('Invalid integration ID: '.$this->id);
//            }
//        } else {
//            $record = new IntegrationRecord();
//            $record->id = $this->id;
//        }
//
//        $record->title = $this->title;
//        $record->handle = $this->handle;
//        $record->typeId = $this->typeId;
//        $record->enabled = $this->enabled;
//        $record->options = Json::encode($this->options);
//        $record->settings = Json::encode($this->settings);
//
//        $record->save(false);
//
//        $this->id = $record->id;
//
//        return parent::afterSave($isNew);
//
//    }

    // Protected
    // -------------------------------------------------------------------------

    /**
     * @inheritdoc
     */
    protected static function defineSources(string $context = null): array
    {
        $sources = [
            [
                'key' => '*',
                'label' => Integrations::t('All Integrations')
            ]
        ];

        $types = Integrations::getInstance()->getTypes()->getAllTypes();

        foreach ($types as $type) {
            $key = 'type:' . $type->id;

            $sources[] = [
                'key'       => $key,
                'label'     => $type->title,
                'data'      => ['id' => $type->id],
                'criteria'  => ['typeId' => $type->id]
            ];

        }

        return $sources;
    }

    /**
     * @inheritdoc
     */
    protected static function defineSearchableAttributes(): array
    {
        return ['title', 'typeId', 'formId'];
    }

    /**
     * @inheritdoc
     */
    protected static function defineSortOptions(): array
    {
        $attributes = [
            'formbuilder_integrations.title'    => Integrations::t('Title'),
            'formbuilder_integrations.typeId'   => Integrations::t('Type'),
            'formbuilder_integrations.formId'   => Integrations::t('Form Name'),
            'elements.dateCreated'              => Integrations::t('Date Created')
        ];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes['title']        = ['label' => Integrations::t('Title')];
        $attributes['typeId']       = ['label' => Integrations::t('Type')];
        $attributes['formId']       = ['label' => Integrations::t('Form Name')];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineDefaultTableAttributes(string $source): array
    {
        $attributes = ['title', 'typeId', 'formId'];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected function tableAttributeHtml(string $attribute): string
    {
        switch ($attribute) {
            case 'typeId':
                $type = Integrations::getInstance()->getTypes()->getTypeById($this->typeId);
                return $type->title;
                break;
        }

        return parent::tableAttributeHtml($attribute);
    }
}