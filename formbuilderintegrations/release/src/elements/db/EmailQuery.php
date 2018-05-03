<?php

namespace owldesign\formbuilderintegrations\elements\db;

use craft\elements\db\ElementQuery;
use craft\helpers\Db;

class EmailQuery extends ElementQuery
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

    // Protected Methods
    // =========================================================================

    protected function beforePrepare(): bool
    {
        $this->joinElementTable('formbuilder_integrations_email');

        $this->query->select([
            'formbuilder_integrations_email.id',
            'formbuilder_integrations_email.title',
            'formbuilder_integrations_email.handle',
            'formbuilder_integrations_email.typeId',
            'formbuilder_integrations_email.content',
            'formbuilder_integrations_email.settings',
        ]);

        if ($this->title) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations_email.title', $this->title));
        }

        if ($this->handle) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations_email.handle', $this->handle));
        }

        if ($this->typeId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations_email.typeId', $this->typeId));
        }

        if ($this->content) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations_email.content', $this->content));
        }

        if ($this->settings) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations_email.settings', $this->settings));
        }

        return parent::beforePrepare();
    }
}