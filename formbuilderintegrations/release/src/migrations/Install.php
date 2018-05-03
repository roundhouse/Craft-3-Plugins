<?php

namespace owldesign\formbuilderintegrations\migrations;

use Craft;
use craft\config\DbConfig;
use craft\db\Migration;

class Install extends Migration
{
    // Public Properties
    // =========================================================================

    public $driver;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->driver = Craft::$app->getConfig()->getDb()->driver;

        $this->createTables();
        $this->addForeignKeys();

        // Refresh the db schema caches
        Craft::$app->db->schema->refresh();

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->driver = Craft::$app->getConfig()->getDb()->driver;
        $this->removeTables();

        return true;
    }

    // Protected Methods
    // =========================================================================

    /**
     * Create tables
     */
    protected function createTables()
    {
        $this->createTable('{{%formbuilder_integrations}}', [
                'id' => $this->primaryKey()->notNull(),
                'title' => $this->string()->notNull(),
                'typeId' => $this->integer()->notNull(),
                'entryId' => $this->integer()->notNull(),
                'formId' => $this->integer()->notNull(),
                'settings' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid()
            ]
        );

        $this->createTable('{{%formbuilder_integrations_types}}', [
                'id' => $this->primaryKey()->notNull(),
                'title' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'enabled' => $this->boolean(),
                'progress' => $this->integer()->notNull(),
                'sortOrder' => $this->smallInteger()->unsigned(),
                'isDefault' => $this->boolean()->defaultValue(true),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid()
            ]
        );

        // Email Integration
        $this->createTable('{{%formbuilder_integrations_email}}', [
                'id' => $this->integer()->notNull(),
                'title' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'enabled' => $this->integer(),
                'typeId' => $this->integer()->notNull(),
                'content' => $this->text(),
                'settings' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY(id)',
            ]
        );
    }

    /**
     * Add foreign keys
     */
    protected function addForeignKeys()
    {
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_integrations}}', 'id'), '{{%formbuilder_integrations}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_integrations}}', 'typeId'), '{{%formbuilder_integrations}}', 'typeId', '{{%formbuilder_integrations_types}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_integrations}}', 'entryId'), '{{%formbuilder_integrations}}', 'entryId', '{{%formbuilder_entries}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_integrations}}', 'formId'), '{{%formbuilder_integrations}}', 'formId', '{{%formbuilder_forms}}', 'id', 'CASCADE', null);

        // Email Integration
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_integrations_email}}', 'id'), '{{%formbuilder_integrations_email}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
    }

    /**
     * Remove tables
     */
    protected function removeTables()
    {
        $this->dropTableIfExists('{{%formbuilder_integrations}}');
        $this->dropTableIfExists('{{%formbuilder_integrations_types}}');
        $this->dropTableIfExists('{{%formbuilder_integrations_email}}');
    }
}