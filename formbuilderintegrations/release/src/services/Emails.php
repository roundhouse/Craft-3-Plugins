<?php

namespace owldesign\formbuilderintegrations\services;

use Craft;
use craft\base\Element;
use craft\fields\Assets;
use craft\web\View;
use craft\base\Component;
use craft\helpers\FileHelper;
use craft\helpers\Json;
use craft\helpers\Html;
use yii\web\NotFoundHttpException;

use craft\redactor\assets\field\FieldAsset as RedactorField;
use craft\redactor\assets\redactor\RedactorAsset;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Entry;

use owldesign\formbuilderintegrations\Integrations as Plugin;
use owldesign\formbuilderintegrations\elements\Email;
use owldesign\formbuilderintegrations\records\Email as EmailRecord;

class Emails extends Component
{
    // Properties
    // =========================================================================

    public $availableVolumes = '*';
    public $availableTransforms = '*';

    // Public Methods
    // =========================================================================

    public function getFields(): array
    {
        $fields = [
            'bodyCopy' => [
                'label' => Plugin::t('Body Copy'),
                'handle' => 'bodyCopy',
                'class' => 'richtext nicetext',
                'id' => 'integrations-body-copy'
            ],
            'footerCopy' => [
                'label' => Plugin::t('Footer Copy'),
                'handle' => 'footerCopy',
                'class' => 'richtext nicetext',
                'id' => 'integrations-footer-copy'
            ]
        ];

        return $fields;
    }

    public function getInputHtml($value, $field): string
    {
        Craft::$app->getView()->registerAssetBundle(RedactorField::class);
        $view = Craft::$app->getView();
        $bundle = $view->getAssetManager()->getBundle(RedactorAsset::class);
        $redactorLang = $bundle->redactorLang ?? 'en';
        $site = Craft::$app->getSites()->getCurrentSite();

        $settings = [
            'id' => $field['id'],
            'linkOptions' => [],
            'volumes' => $this->_getVolumeKeys(),
            'transforms' => $this->_getTransforms(),
            'elementSiteId' => $site->id,
            'redactorConfig' => $this->_getRedactorConfig(),
            'redactorLang' => $redactorLang,
        ];

        $view->registerJs('new Craft.RedactorInput('.Json::encode($settings).');');

        return '<textarea id="'.$field['id'].'" name="content['.$field['handle'].']" style="display: none">'.htmlentities($value, ENT_NOQUOTES, 'UTF-8').'</textarea>';
    }

    /**
     * Get templates
     *
     * @return array
     */
    public function getNotifications()
    {
        $records = EmailRecord::find()->where(['enabled' => 1])->all();
        $types = [];

        foreach ($records as $key => $value) {
            $types[] = new Email($value->toArray([
                'id',
                'title',
                'handle',
                'typeId',
                'enabled',
                'content',
                'settings'
            ]));
        }

        return array_values($types);
    }

    /** Get allowed text fields
     *
     * @return array
     */
    public function getAllowedTextFields()
    {
        $fields = [
            'PlainText' => ['class' => 'PlainText'],
            'Email' => ['class' => 'Email'],
            'Url' => ['class' => 'Url'],
            'Number' => ['class' => 'Number'],
            'Dropdown' => ['class' => 'Dropdown'],
            'Checkboxes' => ['class' => 'Checkboxes'],
            'RadioButtons' => ['class' => 'RadioButtons']
        ];

        return $fields;
    }

    /**
     * Get notification by handle
     *
     * @param $handle
     * @return Email
     */
    public function getNotificationByHandle($handle)
    {
        $record = EmailRecord::find()->where(['handle' => $handle])->one();

        $notification = new Email($record->toArray([
            'id',
            'title',
            'handle',
            'typeId',
            'enabled',
            'content',
            'settings'
        ]));

        return $notification;
    }

    /**
     * Get email body html
     *
     * @param $notification
     * @param $fields
     * @param $submission
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \yii\base\Exception
     */
    public function getBodyHtml($notification, $fields, $submission): string
    {
        $variables['notification'] = $notification;
        $variables['content'] = Json::decode($notification->content);
        $variables['submission'] = $submission;
        $variables['fields'] = $this->_getFieldValues($fields, $submission);

        $oldPath = Craft::$app->view->getTemplateMode();
        Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);
        $template = Craft::$app->view->renderTemplate('formbuilder-integrations/types/email/emailtemplates/html', $variables);
        Craft::$app->view->setTemplateMode($oldPath);

        return $template;
    }

    /**
     * Get email body text
     *
     * @param $notification
     * @param $fields
     * @param $submission
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \yii\base\Exception
     */
    public function getBodyText($notification, $fields, $submission): string
    {
        $variables['notification'] = $notification;
        $variables['content'] = Json::decode($notification->content);
        $variables['submission'] = $submission;
        $variables['fields'] = $this->_getFieldValues($fields, $submission);

        $oldPath = Craft::$app->view->getTemplateMode();
        Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);
        $template = Craft::$app->view->renderTemplate('formbuilder-integrations/types/email/emailtemplates/text', $variables);
        Craft::$app->view->setTemplateMode($oldPath);

        return $template;
    }


    // Private Methods
    // =========================================================================

    /**
     * Get field values
     *
     * @param $fields
     * @param $submission
     * @return array
     */
    private function _getFieldValues($fields, $submission)
    {
        $values = [];

        foreach ($fields as $field) {
            if ($field instanceof Assets ) {
                continue;
            }

            $handle = $field->handle;

            $values[$handle] = [
                'name' => $field->name,
                'value' => $submission->$handle
            ];
        }

        return $values;
    }

    /**
     * Get redactor config file
     *
     * @return mixed
     * @throws \yii\base\Exception
     */
    private function _getRedactorConfig()
    {
        $path = Craft::$app->path->getVendorPath().'/owldesign/form-builder-integrations/src/templates/types/email/redactor.json';
        $configs = Json::decode(file_get_contents($path));

        return $configs;
    }

    /**
     * Get available transforms.
     *
     * @return array
     */
    private function _getTransforms(): array
    {
        if (!$this->availableTransforms) {
            return [];
        }

        $allTransforms = Craft::$app->getAssetTransforms()->getAllTransforms();
        $transformList = [];

        foreach ($allTransforms as $transform) {
            if (!is_array($this->availableTransforms) || in_array($transform->id, $this->availableTransforms, false)) {
                $transformList[] = [
                    'handle' => Html::encode($transform->handle),
                    'name' => Html::encode($transform->name)
                ];
            }
        }

        return $transformList;
    }

    /**
     * Returns the available volumes.
     *
     * @return string[]
     */
    private function _getVolumeKeys(): array
    {
        if (!$this->availableVolumes) {
            return [];
        }

        $criteria = ['parentId' => ':empty:'];

        if ($this->availableVolumes !== '*') {
            $criteria['volumeId'] = $this->availableVolumes;
        }

        $folders = Craft::$app->getAssets()->findFolders($criteria);

        // Sort volumes in the same order as they are sorted in the CP
        $sortedVolumeIds = Craft::$app->getVolumes()->getAllVolumeIds();
        $sortedVolumeIds = array_flip($sortedVolumeIds);

        $volumeKeys = [];

        usort($folders, function($a, $b) use ($sortedVolumeIds) {
            // In case Temporary volumes ever make an appearance in RTF modals, sort them to the end of the list.
            $aOrder = $sortedVolumeIds[$a->volumeId] ?? PHP_INT_MAX;
            $bOrder = $sortedVolumeIds[$b->volumeId] ?? PHP_INT_MAX;

            return $aOrder - $bOrder;
        });

        foreach ($folders as $folder) {
            $volumeKeys[] = 'folder:'.$folder->id;
        }

        return $volumeKeys;
    }

    /**
     * Add entries to link options
     *
     * @return array
     */
    private function _getLinkOptions(): array
    {
        $linkOptions = [];

        $linkOptions[] = [
            'optionTitle' => Plugin::t('Link to an entry'),
            'elementType' => Entry::class,
            'refHandle' => Entry::refHandle(),
            'sources' => $this->_getEntrySources()
        ];

        return $linkOptions;
    }

    /**
     * Get entry sources
     *
     * @return array
     */
    private function _getEntrySources(): array
    {
        $sources = [];
        $forms = FormBuilder::getInstance()->getForms()->getAllForms();


        foreach ($forms as $form) {
            $sources[] = 'form:'.$form->id;
        }

        return $sources;
    }
}