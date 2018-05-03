<?php

namespace owldesign\formbuilderintegrations\plugin;

use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;
use yii\base\Event;

trait Routes
{
    // Private Methods
    // =========================================================================

    private function _registerCpRoutes()
    {
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_CP_URL_RULES, function(RegisterUrlRulesEvent $event) {
            $event->rules['formbuilder-integrations'] = ['template' => 'formbuilder-integrations/index'];
            $event->rules['formbuilder-integrations/email'] = 'formbuilder-integrations/email/index';
            $event->rules['formbuilder-integrations/email/edit'] = 'formbuilder-integrations/email/edit';
            $event->rules['formbuilder-integrations/email/<id:\d+>'] = 'formbuilder-integrations/email/edit';

            $event->rules['formbuilder-integrations/integrations'] = 'formbuilder-integrations/integrations/index';
            $event->rules['formbuilder-integrations/integrations/<type:{handle}>/edit'] = 'formbuilder-integrations/integrations/email/edit';
            $event->rules['formbuilder-integrations/integrations/<type:{handle}>/<id:\d+>'] = 'formbuilder-integrations/integrations/email/edit';
        });
    }
}