<?php

namespace owldesign\formbuilderintegrations\services;

use Craft;
use craft\base\Component;

use owldesign\formbuilderintegrations\models\Type as TypeModel;
use owldesign\formbuilderintegrations\records\Type as TypeRecord;
use yii\web\NotFoundHttpException;

class Types extends Component
{
    // Properties
    // =========================================================================

    private $_typesById;
    private $_fetchedAllTypes = false;

    // Public Methods
    // =========================================================================

    /**
     * Get all types
     *
     * @return array
     */
    public function getAllTypes(): array
    {
        if (!$this->_fetchedAllTypes) {
            $this->_typesById = TypeRecord::find()
                ->orderBy(['title' => SORT_ASC])
                ->indexBy('id')
                ->all();

            foreach ($this->_typesById as $key => $value) {
                $group = new TypeModel();
                $group->id = $value->id;
                $group->title = $value->title;
                $group->handle = $value->handle;
                $group->progress = $value->progress;
                $group->sortOrder = $value->sortOrder;
                $group->isDefault = $value->isDefault;
                $this->_typesById[$key] = $group;
            }

            $this->_fetchedAllTypes = true;
        }

        return array_values($this->_typesById);
    }

    /**
     * Get all enabled types
     *
     * @return TypeModel
     */
    public function getAvailableTypes(): array
    {
        $record = TypeRecord::find()->where(['enabled' => 1])->all();

        $types = [];

        foreach ($record as $key => $value) {
            $types[] = new TypeModel($value->toArray([
                'id',
                'title',
                'handle',
                'enabled',
                'progress',
                'sortOrder',
                'isDefault'
            ]));
        }

        return array_values($types);
    }

    /**
     * Get type by handle
     *
     * @param $handle
     * @return TypeModel
     */
    public function getTypeByHandle($handle): TypeModel
    {
        $record = TypeRecord::find()->where(['handle' => $handle])->one();

        $type = $this->_createTypeFromRecord($record);

        return $type;
    }

    /**
     * Get type by id
     *
     * @param $id
     * @return null|TypeModel
     */
    public function getTypeById($id): TypeModel
    {
        $record = TypeRecord::find()->where(['id' => $id])->one();
        $type = $this->_createTypeFromRecord($record);

        return $type;
    }

    /**
     * Install default types
     *
     * @throws \yii\db\Exception
     */
    public function installDefaultTypes()
    {
        $defaultTypes = [
            0 => [
                'title'         => 'Email',
                'handle'        => 'email',
                'enabled'       => 1,
                'progress'      => 100,
                'sortOrder'     => 1,
                'isDefault'     => 0
            ],
            1 => [
                'title'         => 'Slack',
                'handle'        => 'slack',
                'enabled'       => 0,
                'progress'      => 90,
                'sortOrder'     => 2,
                'isDefault'     => 0
            ]
        ];

        foreach ($defaultTypes as $key => $value) {
            Craft::$app->getDb()->createCommand()
                ->insert('{{%formbuilder_integrations_types}}', [
                    'title' => $value['title'],
                    'handle' => $value['handle'],
                    'enabled' => $value['enabled'],
                    'progress' => $value['progress'],
                    'sortOrder' => $value['sortOrder'],
                    'isDefault' => $value['isDefault']
                ])
                ->execute();
        }
    }

    /**
     * Save a type
     *
     * @param Type $type
     * @return bool
     * @throws NotFoundHttpException
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function save(Type $type): bool
    {
        $isNewType = !$type->id;

        if (!$isNewType) {
            $typeRecord = TypeRecord::findOne($type->id);

            if (!$typeRecord) {
                throw new NotFoundHttpException('No type exist with the ID ' . $type->id);
            }
        } else {
            $typeRecord = new TypeRecord();
        }

        $type->validate();

        if ($type->hasErrors()) {
            return false;
        }

        $typeRecord->title = $type->title;
        $typeRecord->handle = $type->handle;
        $typeRecord->enabled = $type->enabled;
        $typeRecord->progress = $type->progress;
        $typeRecord->sortOrder = $type->sortOrder;
        $typeRecord->isDefault = $type->isDefault;

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {

            if ($isNewType) {
                $typeRecord->id = $type->id;
            }

            $typeRecord->save(false);

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    // Private Methods
    // =========================================================================


    /**
     * Create type model from record
     *
     * @param TypeRecord|null $record
     * @return null|TypeModel
     */
    private function _createTypeFromRecord(TypeRecord $record = null)
    {
        if (!$record) {
            return null;
        }

        $type = new TypeModel($record->toArray([
            'id',
            'title',
            'handle',
            'enabled',
            'progress',
            'sortOrder',
            'isDefault'
        ]));

        return $type;
    }

}