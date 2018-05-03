<?php

namespace owldesign\formbuilderintegrations\elements\db;

use craft\elements\db\ElementQuery;
use craft\helpers\Db;

class IntegrationQuery extends ElementQuery
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

    // Protected Methods
    // =========================================================================

    protected function beforePrepare(): bool
    {
        $this->joinElementTable('formbuilder_integrations');

        $this->query->select([
            'formbuilder_integrations.id',
            'formbuilder_integrations.title',
            'formbuilder_integrations.typeId',
            'formbuilder_integrations.formId',
            'formbuilder_integrations.entryId',
            'formbuilder_integrations.settings',
        ]);

        if ($this->title) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations.title', $this->title));
        }

        if ($this->typeId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations.typeId', $this->typeId));
        }

        if ($this->formId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations.formId', $this->formId));
        }

        if ($this->entryId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations.entryId', $this->entryId));
        }

        if ($this->settings) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_integrations.settings', $this->settings));
        }

        return parent::beforePrepare();
    }
}