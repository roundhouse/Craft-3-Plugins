<?php

namespace owldesign\formbuilderintegrations\controllers;

use Craft;
use craft\helpers\Json;
use craft\web\Controller;
use owldesign\formbuilderintegrations\Integrations;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use owldesign\formbuilderintegrations\web\assets\Integrations as IntegrationsAssets;

class IntegrationsController extends Controller
{
    // Properties
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected $allowAnonymous = ['actionIndex', 'actionEdit'];

    // Public Methods
    // =========================================================================

    /**
     * @return Response
     * @throws \yii\base\InvalidConfigException
     */
    public function actionIndex(): Response
    {
        $this->getView()->registerAssetBundle(IntegrationsAssets::class);

        return $this->renderTemplate('formbuilder-integrations/integrations/index');
    }

    /**
     * Add notification template
     *
     * @return Response
     * @throws \Twig_Error_Loader
     * @throws \yii\base\Exception
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionAddIntegration()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();
        $request                    = Craft::$app->getRequest();
        $variables['index']         = $request->getBodyParam('index');
        $variables['integration']   = Craft::$app->elements->getElementById($request->getBodyParam('elementId'));
        $variables['type']          = Integrations::getInstance()->getTypes()->getTypeByHandle($request->getBodyParam('type'));
        $variables['form']          = Json::decode($request->getBodyParam('form'));

        $markup = Craft::$app->view->renderTemplate('formbuilder-integrations/integrations/'.$variables['type'].'/_integration-js', $variables);

        return $this->asJson([
            'success' => true,
            'markup'   => $markup,
        ]);
    }
}