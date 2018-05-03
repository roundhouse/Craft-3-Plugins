<?php

namespace owldesign\formbuilderintegrations\plugin;

use owldesign\formbuilderintegrations\services\Types;
use owldesign\formbuilderintegrations\services\Integrations;
use owldesign\formbuilderintegrations\services\Emails;

trait Services
{
    // Public Methods
    // =========================================================================

    /**
     * Get types
     *
     * @return Types
     */
    public function getTypes(): Types
    {
        return $this->get('types');
    }

    /**
     * Get integrations
     *
     * @return Integrations
     */
    public function getIntegrations(): Integrations
    {
        return $this->get('integrations');
    }

    /**
     * Get email
     *
     * @return Emails
     */
    public function getEmails(): Emails
    {
        return $this->get('emails');
    }

    // Private Methods
    // =========================================================================

    /**
     * Set components
     */
    private function _setPluginComponents()
    {
        $this->setComponents([
            'types' => Types::class,
            'integrations' => Integrations::class,
            'emails' => Emails::class,
        ]);
    }
}