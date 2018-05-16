<?php

namespace owldesign\formbuilderintegrations\controllers;

use Craft;
use craft\helpers\Json;
use craft\web\Controller;
use craft\web\View;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use owldesign\formbuilderintegrations\elements\Email;
use owldesign\formbuilderintegrations\Integrations;
use owldesign\formbuilderintegrations\web\assets\Integrations as IntegrationsAssets;

class EmailController extends Controller
{
    // Properties
    // =========================================================================

    public $availableVolumes = '*';

    /**
     * @inheritdoc
     */
    protected $allowAnonymous = ['actionIndex', 'actionSave', 'actionEdit'];

    // Public Methods
    // =========================================================================

    /**
     * @return Response
     * @throws \yii\base\InvalidConfigException
     */
    public function actionIndex(): Response
    {
        $this->getView()->registerAssetBundle(IntegrationsAssets::class);

        return $this->renderTemplate('formbuilder-integrations/types/email/index');
    }

    /**
     * Edit email integration
     *
     * @return Response
     * @throws NotFoundHttpException
     * @throws \yii\base\InvalidConfigException
     */
    public function actionEdit(): Response
    {
        $params = Craft::$app->getUrlManager()->getRouteParams();

        $referrer = Craft::$app->request->getParam('referrer');

        $variables = [
            'id' => (isset($params['id'])) ? $params['id'] : null,
            'type' =>  (isset($params['type'])) ? $params['type'] : null
        ];

        $this->_prepEditIntegrationVariables($variables);

        $view = $this->getView();
        $view->registerAssetBundle(IntegrationsAssets::class);

        if ($variables['integration']->id) {
            $variables['title'] = Integrations::t('Edit'). ' ' .$variables['integration']->title;
        } else {

            $variables['title'] =  Integrations::t('New Email Template');
        }

        $variables['fullPageForm'] = true;

        if ($referrer) {
            $variables['continueEditingUrl'] = 'formbuilder-integrations/email/{id}' . '?referrer=' . $referrer;
            $variables['redirect'] = $referrer;
        } else {
            $variables['continueEditingUrl'] = 'formbuilder-integrations/email/{id}';
        }

        $variables['saveShortcutRedirect'] = $variables['continueEditingUrl'];

        // Live Preview
        // TODO: add live preview
        $variables['showPreviewBtn'] = false;
        if (!Craft::$app->getRequest()->isMobileBrowser(true)) {
            $this->getView()->registerJs('Craft.LivePreview.init('.Json::encode([
                    'fields' => '#fields > div > div .field',
                    'extraFields' => '#settings',
                    'previewUrl' => $variables['integration']->getUrl(),
                    'previewAction' => 'formbuilder-integrations/email/preview-email-template',
                    'previewParams' => [
                        'integrationId' => $variables['integration']->id,
                        'siteId' => $variables['integration']->siteId
                    ]
                ]).');');
        }

        return $this->renderTemplate('formbuilder-integrations/types/email/_edit', $variables);
    }

    /**
     * Preview email integration template
     *
     * @return Response
     * @throws NotFoundHttpException
     * @throws \yii\base\Exception
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionPreviewEmailTemplate(): Response
    {
        $this->requirePostRequest();

        $integration = $this->_getIntegrationModel();
        $this->_populateIntegrationModel($integration);

        return $this->_showIntegration($integration);
    }

    /**
     * Save email integration
     *
     * @return null|Response
     * @throws \Throwable
     * @throws \craft\errors\ElementNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionSave()
    {
        $this->requirePostRequest();
        $this->requireAdmin();

        $integration = $this->_getIntegrationModel();
        $this->_populateIntegrationModel($integration);

        if (!Craft::$app->getElements()->saveElement($integration)) {
            Craft::$app->getSession()->setError(Integrations::t('Couldn’t save the integrations.'));

            Craft::$app->getUrlManager()->setRouteParams([
                'integration' => $integration
            ]);

            return null;
        }

        Craft::$app->getSession()->setNotice(Integrations::t('Integration saved.'));

        return $this->redirectToPostedUrl($integration);
    }

    // Private Methods
    // =========================================================================

    private function _prepEditIntegrationVariables(array &$variables)
    {
        if ($variables['id']) {
            $variables['integration'] = Integrations::getInstance()->getIntegrations()->getIntegrationById($variables['id']);
            $variables['content'] = Json::decode($variables['integration']->content);
            $variables['settings'] = Json::decode($variables['integration']->settings);
            $variables['integration']->content = $variables['content'];
            $variables['integration']->settings = $variables['settings'];

            if (!$variables['integration']) {
                throw new NotFoundHttpException('Integration not found');
            }
        } else {
            $variables['integration'] = new Email();
            $variables['integration']->enabled = 1;
        }
    }

    /**
     * Get email integration model
     *
     * @return Email
     * @throws NotFoundHttpException
     */
    private function _getIntegrationModel(): Email
    {
        $integrationId = Craft::$app->getRequest()->getBodyParam('integrationId');

        if ($integrationId) {
            $integration = Integrations::getInstance()->getIntegrations()->getIntegrationById($integrationId);

            if (!$integration) {
                throw new NotFoundHttpException('Integration not found');
            }
        } else {
            $integration = new Email();
        }

        return $integration;
    }

    /**
     * Populate email model
     *
     * @param Email $email
     */
    private function _populateIntegrationModel(Email $email)
    {
        $email->title = Craft::$app->getRequest()->getBodyParam('title');
        $email->handle = Craft::$app->getRequest()->getBodyParam('handle');
        $email->typeId = Craft::$app->getRequest()->getBodyParam('typeId');
        $email->enabled = (bool)Craft::$app->getRequest()->getBodyParam('enabled');
        $email->content = Craft::$app->getRequest()->getBodyParam('content');
        $email->settings = Craft::$app->getRequest()->getBodyParam('settings');
    }

    /**
     * Show integration for preview
     *
     * @param Email $integration
     * @return Response
     * @throws \yii\base\Exception
     */
    private function _showIntegration(Email $integration): Response
    {
        Craft::$app->getElements()->setPlaceholderElement($integration);
        $this->getView()->getTwig()->disableStrictVariables();

        Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);

        $variables['email'] = $integration;
        $variables['content'] = $integration->content;
        $variables['settings'] = $integration->settings;
        $variables['fields'] = [];

        return $this->renderTemplate('formbuilder-integrations/types/email/emailtemplates/html', $variables);
    }

}