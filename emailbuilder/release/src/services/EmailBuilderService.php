<?php
/**
 * Email Builder plugin for Craft CMS 3.x
 *
 * Email builder
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse
 */

namespace roundhouse\emailbuilder\services;

use roundhouse\emailbuilder\EmailBuilder;

use Craft;
use craft\base\Component;

/**
 * @author    Roundhouse
 * @package   EmailBuilder
 * @since     1.0.0
 */
class EmailBuilderService extends Component
{
    // Public Methods
    // =========================================================================

    /*
     * @return mixed
     */
    public function exampleService()
    {
        $result = 'something';
        // Check our Plugin's settings for `someAttribute`
        if (EmailBuilder::$plugin->getSettings()->someAttribute) {
        }

        return $result;
    }
}
