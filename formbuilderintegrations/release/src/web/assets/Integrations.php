<?php

namespace owldesign\formbuilderintegrations\web\assets;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class Integrations extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = __DIR__;

        $this->depends = [
            CpAsset::class,
            Fontawesome::class,
        ];

        $this->js = [
            'js/application.js',
        ];

        $this->css = [
            'css/application.css',
        ];

        parent::init();
    }
}