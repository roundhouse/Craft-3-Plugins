<?php
/**
 * Email Builder plugin for Craft CMS 3.x
 *
 * Email builder
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse
 */

namespace roundhouse\emailbuilder;

use roundhouse\emailbuilder\services\EmailBuilderService as EmailBuilderServiceService;
use roundhouse\emailbuilder\variables\EmailBuilderVariable;
use roundhouse\emailbuilder\twigextensions\EmailBuilderTwigExtension;
use roundhouse\emailbuilder\models\Settings;
use roundhouse\emailbuilder\elements\EmailNotification as EmailNotificationElement;

use Craft;
use craft\base\Plugin;
use craft\web\UrlManager;
use craft\services\Elements;
use craft\web\twig\variables\CraftVariable;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;

use roundhouse\formbuilder\controllers\EntriesController;
use roundhouse\emailbuilder\services\Notification as NotificationService;
use yii\base\Event;

/**
 * Class EmailBuilder
 *
 * @author    Roundhouse
 * @package   EmailBuilder
 * @since     1.0.0
 *
 * @property  EmailBuilderServiceService $emailBuilderService
 */
class EmailBuilder extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * @var EmailBuilder
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $schemaVersion = '1.0.0';

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        $this->setComponents([
            'notifications' => NotificationService::class
        ]);

        Craft::$app->view->registerTwigExtension(new EmailBuilderTwigExtension());

//        Event::on(
//            EntriesController::class,
//            EntriesController::EVENT_SEND_NOTIFICATION,
//            function($event) {
//                $form = $event->form;
//                $entry = $event->entry;
//                $notifications = $event->notifications;
//
//                EmailBuilder::$plugin->notifications->prepareNotification($form, $entry, $notifications);
//            }
//        );

        Event::on(
            EntriesController::class,
            EntriesController::EVENT_AFTER_SUBMIT_ENTRY,
            function($event) {
                $entry = $event->entry;
            }
        );

        Event::on(
            UrlManager::class, 
            UrlManager::EVENT_REGISTER_CP_URL_RULES, 
            function(RegisterUrlRulesEvent $event) {
                $event->rules['email-builder'] = ['template' => 'email-builder'];
                $event->rules['email-builder/notifications'] = 'email-builder/notification';
                $event->rules['email-builder/notifications/new'] = 'email-builder/notification/edit';
            }
        );


        Event::on(
            Elements::class, 
            Elements::EVENT_REGISTER_ELEMENT_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = EmailNotificationElement::class;
            }
        );

        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                $variable->set('emailBuilder', EmailBuilderVariable::class);
            }
        );
    }

    public function getVersion()
    {
        return '1.0.0';
    }

    public function getCpNavItem()
    {
        $item = parent::getCpNavItem();
        $item['subnav'] = [
            'dashboard' => ['label' => 'Dashboard', 'url' => 'email-builder/dashboard'],
            'notifications' => ['label' => 'Notifications', 'url' => 'email-builder/notifications'],
        ];
        return $item;
    }

    /**
     * @param string $message
     * @param array  $params
     *
     * @return string
     */
    public static function t($message, array $params = [])
    {
        return Craft::t('email-builder', $message, $params);
    }

    // Protected Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected function createSettingsModel()
    {
        return new Settings();
    }

    /**
     * @inheritdoc
     */
    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate(
            'email-builder/settings',
            [
                'settings' => $this->getSettings()
            ]
        );
    }
}
