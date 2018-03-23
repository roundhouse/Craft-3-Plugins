<?php

namespace roundhouse\emailbuilder\elements\db;

use Craft;
use craft\db\Query;
use craft\db\QueryAbortedException;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use yii\db\Connection;

class EmailNotificationQuery extends ElementQuery
{   
    public $id;
    public $name;
    public $handle;
    public $siteId;
    public $groupId;
    public $statusId;
    public $options;
    public $content;
    public $settings;

    // Public Methods
    // =========================================================================


    // Protected Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected function beforePrepare(): bool
    {
        $this->joinElementTable('emailbuilder_emailnotifications');

         $this->query->select([
            'emailbuilder_emailnotifications.name',
            'emailbuilder_emailnotifications.handle',
            'emailbuilder_emailnotifications.siteId',
            'emailbuilder_emailnotifications.groupId',
            'emailbuilder_emailnotifications.statusId',
            'emailbuilder_emailnotifications.options',
            'emailbuilder_emailnotifications.content',
            'emailbuilder_emailnotifications.settings'
        ]);

         if ($this->id) {
             $this->subQuery->andWhere(Db::parseParam('emailbuilder_emailnotifications.id', $this->id));
         }

        if ($this->siteId) {
            $this->subQuery->andWhere(Db::parseParam('emailbuilder_emailnotifications.siteId', $this->siteId));
        }

         if ($this->name) {
             $this->subQuery->andWhere(Db::parseParam('emailbuilder_emailnotifications.name', $this->name));
         }

         if ($this->handle) {
             $this->subQuery->andWhere(Db::parseParam('emailbuilder_emailnotifications.handle', $this->handle));
         }

         if ($this->groupId) {
             $this->subQuery->andWhere(Db::parseParam('emailbuilder_emailnotifications.groupId', $this->groupId));
         }

         if ($this->statusId) {
             $this->subQuery->andWhere(Db::parseParam('emailbuilder_emailnotifications.statusId', $this->statusId));
         }

        return parent::beforePrepare();
    }
}