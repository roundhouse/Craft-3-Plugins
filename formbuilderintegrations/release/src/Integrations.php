<?php
/**
 * Form Builder Integrations plugin for Craft CMS 3.x
 *
 * Various 3rd party integrations for Form Builder plugin.
 *
 * @link      https://owl-design.net
 * @copyright Copyright (c) 2018 Vadim Goncharov
 */

namespace owldesign\formbuilderintegrations;


use Craft;
use craft\base\Plugin;
use craft\helpers\ArrayHelper;
use craft\services\Elements;
use craft\events\RegisterComponentTypesEvent;
use craft\web\twig\variables\CraftVariable;
use yii\base\Event;

use owldesign\formbuilderintegrations\plugin\Routes;
use owldesign\formbuilderintegrations\plugin\Services;
use owldesign\formbuilderintegrations\web\twig\Variables;
use owldesign\formbuilderintegrations\elements\Email as EmailElement;

use roundhouse\formbuilder\controllers\EntriesController;
use roundhouse\formbuilder\events\EntryEvent;


/**
 * Class Integrations
 *
 * @author    Vadim Goncharov
 * @package   Integrations
 * @since     1.0.0
 *
 */
class Integrations extends Plugin
{
    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $schemaVersion = '1.0.0';
    public $hasCpSection = false;
    public $hasCpSettings = false;

    // Traits
    // =========================================================================

    use Routes;
    use Services;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        $this->_setPluginComponents();
        $this->_registerCpRoutes();
        $this->_registerVariables();
        $this->_registerElementTypes();


        Event::on(EntriesController::class, EntriesController::EVENT_AFTER_SUBMIT_ENTRY, function(EntryEvent $event) {
            $entry = $event->entry;
            $form = $event->form;

            if (isset($form->integrations) && $form->integrations) {
                self::getInstance()->getIntegrations()->performIntegrations($entry, $form);
            }
        });

    }

    /**
     * @inheritdoc
     */
    public function getCpNavItem()
    {
        $parent = parent::getCpNavItem();

        $parent['label'] = 'Integrations';

        $navigation = ArrayHelper::merge($parent, [
            'subnav' => [
                'email' => [
                    'label' => Integrations::t('Email'),
                    'url' => 'formbuilder-integrations/email'
                ]
            ]
        ]);

        return $navigation;
    }

    /**
     * @param $message
     * @param array $params
     * @return string
     */
    public static function t($message, array $params = [])
    {
        return Craft::t('formbuilder-integrations', $message, $params);
    }

    // Private Methods
    // =========================================================================

    /**
     * Register Commerce’s template variable.
     */
    private function _registerVariables()
    {
        Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function(Event $event) {
            /** @var CraftVariable $variable */
            $variable = $event->sender;
            $variable->attachBehavior('fbi', Variables::class);
        });
    }

    private function _registerElementTypes()
    {
        Event::on(
            Elements::class,
            Elements::EVENT_REGISTER_ELEMENT_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = EmailElement::class;
            }
        );
    }

    // Protected Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    /**
     * @inheritdoc
     */
    protected function afterInstall()
    {
        Integrations::getInstance()->getTypes()->installDefaultTypes();
    }


}
