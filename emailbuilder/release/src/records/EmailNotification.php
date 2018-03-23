<?php

namespace roundhouse\emailbuilder\records;

use roundhouse\emailbuilder\EmailBuilder;

use Craft;
use craft\db\ActiveRecord;
use craft\records\Element;
use craft\records\FieldLayout;
use yii\db\ActiveQueryInterface;

class EmailNotification extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%emailbuilder_emailnotifications}}';
    }

    public function getElement(): ActiveQueryInterface
    {
        return $this->hasOne(Element::class, ['id' => 'id']);
    }
}