<?php

namespace owldesign\formbuilderintegrations\records;

use craft\db\ActiveRecord;
use yii\db\ActiveQueryInterface;

class Type extends ActiveRecord
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName(): string
    {
        return '{{%formbuilder_integrations_types}}';
    }

    /**
     * @return ActiveQueryInterface
     */
    public function getIntegration(): ActiveQueryInterface
    {
        return $this->hasMany(Integration::class, ['id' => 'id']);
    }
}