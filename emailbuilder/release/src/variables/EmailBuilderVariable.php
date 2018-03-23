<?php
/**
 * Email Builder plugin for Craft CMS 3.x
 *
 * Email builder
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse
 */

namespace roundhouse\emailbuilder\variables;

use roundhouse\emailbuilder\EmailBuilder;

use Craft;

/**
 * @author    Roundhouse
 * @package   EmailBuilder
 * @since     1.0.0
 */
class EmailBuilderVariable
{
    // Public Methods
    // =========================================================================

    /**
     * @param null $optional
     * @return string
     */
    public function getTemplates()
    {
        $templates = EmailBuilder::$plugin->notifications->getTemplates();

        return $templates;
    }
}
