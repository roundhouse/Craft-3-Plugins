<?php

namespace owldesign\formbuilderintegrations\controllers;

use Craft;
use craft\web\Controller;
use owldesign\formbuilderintegrations\Integrations;
use owldesign\formbuilderintegrations\models\Type;
use yii\helpers\Json;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use owldesign\formbuilderintegrations\web\assets\Integrations as IntegrationsAssets;
use owldesign\formbuilderintegrations\models\Type as TypeModel;

class TypesController extends Controller
{
    // Properties
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected $allowAnonymous = ['actionIndex', 'actionSave'];

    // Public Methods
    // =========================================================================

    /**
     * @return Response
     * @throws \yii\base\InvalidConfigException
     */
    public function actionIndex(): Response
    {
        $this->getView()->registerAssetBundle(IntegrationsAssets::class);

        $variables['type'] = new TypeModel();

        return $this->renderTemplate('formbuilder-integrations/types/index', $variables);
    }

    /**
     * Save type
     *
     * @return Response
     * @throws NotFoundHttpException
     * @throws \Throwable
     * @throws \yii\db\Exception
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionSave(): Response
    {
        $this->requirePostRequest();
        $this->requireAdmin();

        $type = $this->_getTypeModel();
        $this->_populateTypeModel($type);

        if (!Integrations::getInstance()->getTypes()->save($type)) {
            Craft::$app->getSession()->setError(Integrations::t('Couldn’t save type.'));

            Craft::$app->getUrlManager()->setRouteParams([
                'type' => $type
            ]);

            return null;
        }

        Craft::$app->getSession()->setNotice(Integrations::t('Type saved.'));

        return $this->redirectToPostedUrl($type);

    }

    /**
     * Get type model
     *
     * @return TypeModel
     * @throws NotFoundHttpException
     */
    private function _getTypeModel(): Type
    {
        $typeId = Craft::$app->getRequest()->getBodyParam('typeId');

        if ($typeId) {
            $type = Integrations::getTypes()->getTypeRecordById($typeId);

            if (!$type) {
                throw new NotFoundHttpException('Type not found');
            }
        } else {
            $type = new Type();
        }

        return $type;
    }

    /**
     * Populate type model
     *
     * @param TypeModel $type
     * @throws \yii\web\BadRequestHttpException
     */
    private function _populateTypeModel(Type $type)
    {
        $params = Craft::$app->getRequest()->getBodyParams('params');

        $type->title = Craft::$app->getRequest()->getRequiredBodyParam('title');
        $type->handle = Craft::$app->getRequest()->getRequiredBodyParam('handle');

        if (isset($params['settings'])) {
            $type->settings = Json::encode($params['settings']);
        }

        if (isset($params['options'])) {
            $type->settings = Json::encode($params['options']);
        }
    }
}