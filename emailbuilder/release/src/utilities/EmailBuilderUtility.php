<?php
/**
 * Email Builder plugin for Craft CMS 3.x
 *
 * Email builder
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse
 */

namespace roundhouse\emailbuilder\utilities;

use roundhouse\emailbuilder\EmailBuilder;
use roundhouse\emailbuilder\assetbundles\emailbuilderutilityutility\EmailBuilderUtilityUtilityAsset;

use Craft;
use craft\base\Utility;

/**
 * Email Builder Utility
 *
 * @author    Roundhouse
 * @package   EmailBuilder
 * @since     1.0.0
 */
class EmailBuilderUtility extends Utility
{
    // Static
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return Craft::t('email-builder', 'EmailBuilderUtility');
    }

    /**
     * @inheritdoc
     */
    public static function id(): string
    {
        return 'emailbuilder-email-builder-utility';
    }

    /**
     * @inheritdoc
     */
    public static function iconPath()
    {
        return Craft::getAlias("@roundhouse/emailbuilder/assetbundles/emailbuilderutilityutility/dist/img/EmailBuilderUtility-icon.svg");
    }

    /**
     * @inheritdoc
     */
    public static function badgeCount(): int
    {
        return 0;
    }

    /**
     * @inheritdoc
     */
    public static function contentHtml(): string
    {
        Craft::$app->getView()->registerAssetBundle(EmailBuilderUtilityUtilityAsset::class);

        $someVar = 'Have a nice day!';
        return Craft::$app->getView()->renderTemplate(
            'email-builder/_components/utilities/EmailBuilderUtility_content',
            [
                'someVar' => $someVar
            ]
        );
    }
}
