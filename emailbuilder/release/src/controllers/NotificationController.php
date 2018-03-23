<?php

namespace roundhouse\emailbuilder\controllers;

use Craft;
use craft\fields\Email;
use craft\web\View;
use craft\web\Controller;
use craft\helpers\Json;
use roundhouse\emailbuilder\EmailBuilder;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use roundhouse\emailbuilder\elements\EmailNotification;
use roundhouse\emailbuilder\assets\EmailBuilder as EmailBuilderAsset;

class NotificationController extends Controller
{
    protected $allowAnonymous = true;

    public function actionIndex()
    {
        $this->requireAdmin();

        $view = $this->getView();
        $view->registerAssetBundle(EmailBuilderAsset::class);

        return $this->renderTemplate('email-builder/notifications/index');
    }

    public function actionEdit(int $notificationId = null, EmailNotification $notification = null): Response
    {
        $variables['notificationId'] = $notificationId;
        $this->_prepNotificationVariables($variables);
        $notification = $variables['notification'];

        $view = $this->getView();
        $view->registerAssetBundle(EmailBuilderAsset::class);

        $variables['title'] = 'Edit Notification';
        $variables['fullPageForm'] = true;
        $variables['continueEditingUrl'] = 'email-builder/notifications/{id}';
        $variables['saveShortcutRedirect'] = $variables['continueEditingUrl'];

        // Live Preview
        if (!Craft::$app->getRequest()->isMobileBrowser(true)) {
            $this->getView()->registerJs('Craft.LivePreview.init('.Json::encode([
                    'fields' => '#fields .field',
                    'extraFields' => '#settings',
                    'previewUrl' => $notification->getUrl(),
                    'previewAction' => 'email-builder/notification/preview-notification',
                    'previewParams' => [
                        'categoryId' => $notification->id,
                        'siteId' => $notification->siteId,
                    ]
                ]).');');

            $variables['showPreviewBtn'] = true;
        } else {
            $variables['showPreviewBtn'] = false;
        }

        return $this->renderTemplate('email-builder/notifications/_edit', $variables);

    }

    public function actionPreviewNotification(): Response
    {
        $this->requirePostRequest();

        $notification = $this->_getNotificationModel();
        $this->_populateNotificationModel($notification);

        return $this->_showNotification($notification);

    }

    public function actionSave()
    {
        $this->requirePostRequest();
        $this->requireAdmin();

        $notification = $this->_getNotificationModel();
        $this->_populateNotificationModel($notification);

        if (!EmailBuilder::$plugin->notifications->save($notification)) {
            Craft::$app->getSession()->setError(Craft::t('email-builder', 'Couldn’t save the notification.'));

            Craft::$app->getUrlManager()->setRouteParams([
                'notification' => $notification
            ]);

            return null;
        }

        Craft::$app->getSession()->setNotice(Craft::t('email-builder', 'Notification saved.'));

        return $this->redirectToPostedUrl($notification);
    }

    private function _getNotificationModel(): EmailNotification
    {
        $notificationId = Craft::$app->getRequest()->getBodyParam('notificationId');
        $siteId = Craft::$app->getRequest()->getBodyParam('siteId');

        if ($notificationId) {
            $notification = EmailBuilder::$plugin->notifications->getNotificationById($notificationId, $siteId);

            if (!$notification) {
                throw new NotFoundHttpException('Notification not found');
            }
        } else {
            $notification = new EmailNotification();

            if ($siteId) {
                $notification->siteId = $siteId;
            }
        }

        return $notification;
    }

    private function _populateNotificationModel(EmailNotification $notification)
    {
        $notification->title = Craft::$app->getRequest()->getBodyParam('name');
        $notification->name = Craft::$app->getRequest()->getBodyParam('name');
        $notification->siteId = Craft::$app->getRequest()->getBodyParam('siteId');
        $notification->handle = Craft::$app->getRequest()->getBodyParam('handle');
        $notification->content = Craft::$app->getRequest()->getBodyParam('content');

    }

    private function _showNotification(EmailNotification $notification): Response
    {
        $site = Craft::$app->getSites()->getSiteById($notification->siteId);

        if (!$site) {
            throw new ServerErrorHttpException('Invalid site ID: '.$notification->siteId);
        }

        Craft::$app->language = $site->language;

        Craft::$app->getElements()->setPlaceholderElement($notification);

        $this->getView()->getTwig()->disableStrictVariables();

        $oldPath = Craft::$app->view->getTemplateMode();
        Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);

        $template = $this->renderTemplate('email-builder/emails/basic-responsive', [
            'notification' => $notification,
            'content' => $notification->content
        ]);

        Craft::$app->view->setTemplateMode($oldPath);

        if (Craft::$app->getRequest()->getIsAjax()) {
            return $this->asJson([
                'template' => $template->data
            ]);
        } else {
            return $template;
        }
    }

    private function _prepNotificationVariables(array &$variables)
    {
        if ($variables['notificationId']) {
            $variables['notification'] = EmailBuilder::$plugin->notifications->getNotificationRecordById($variables['notificationId']);

            if (!$variables['notification']) {
                throw new NotFoundHttpException('Notification not found');
            }
        } else {
            $variables['notification'] = new EmailNotification();
        }
    }
}