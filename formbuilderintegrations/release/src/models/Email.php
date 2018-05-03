<?php

namespace owldesign\formbuilderintegrations\models;

use craft\base\Model;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;

use owldesign\formbuilderintegrations\Integrations;
use owldesign\formbuilderintegrations\records\Type as TypeRecord;

class Email extends Model
{
    // Public Properties
    // =========================================================================

    public $id;
    public $title;
    public $handle;
    public $enabled;
    public $progress;
    public $sortOrder;
    public $isDefault;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'number', 'integerOnly' => true],
            [['handle'], HandleValidator::class, 'reservedWords' => ['id', 'dateCreated', 'dateUpdated', 'uid', 'title']],
            [['title', 'handle'], UniqueValidator::class, 'targetClass' => TypeRecord::class],
            [['title', 'handle'], 'required'],
            [['title', 'handle'], 'string', 'max' => 255]

        ];
    }

    /**
     * @inheritdoc
     */
    public function __toString(): string
    {
        return Integrations::t($this->title);
    }


}