<?php
/**
 * Email Builder plugin for Craft CMS 3.x
 *
 * Email builder
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse
 */

namespace roundhouse\emailbuilder\migrations;

use roundhouse\emailbuilder\EmailBuilder;

use Craft;
use craft\config\DbConfig;
use craft\db\Migration;

/**
 * @author    Roundhouse
 * @package   EmailBuilder
 * @since     1.0.0
 */
class Install extends Migration
{
    // Public Properties
    // =========================================================================

    /**
     * @var string The database driver to use
     */
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
        $this->createIndexes();
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
     * @return bool
     */
    protected function createTables()
    {
        $this->createTable('{{%emailbuilder_emailnotifications}}', [
                'id' => $this->integer()->notNull(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'siteId' => $this->integer(),
                'groupId' => $this->integer(),
                'statusId' => $this->integer(),
                'options' => $this->text(),
                'content' => $this->text(),
                'settings' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY(id)',
            ]
        );

        return true;
    }

    /**
     * @return void
     */
    protected function createIndexes()
    {
        $this->createIndex($this->db->getIndexName('{{%emailbuilder_emailnotifications}}', 'name', true), '{{%emailbuilder_emailnotifications}}', 'name', true);
        $this->createIndex($this->db->getIndexName('{{%emailbuilder_emailnotifications}}', 'handle', true), '{{%emailbuilder_emailnotifications}}', 'handle', true);

        // Additional commands depending on the db driver
        switch ($this->driver) {
            case DbConfig::DRIVER_MYSQL:
                break;
            case DbConfig::DRIVER_PGSQL:
                break;
        }
    }

    /**
     * @return void
     */
    protected function addForeignKeys()
    {
        $this->addForeignKey($this->db->getForeignKeyName('{{%emailbuilder_emailnotifications}}', 'id'), '{{%emailbuilder_emailnotifications}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
    }

    /**
     * @return void
     */
    protected function removeTables()
    {
        $this->dropTableIfExists('{{%emailbuilder_emailnotifications}}');
    }
}
