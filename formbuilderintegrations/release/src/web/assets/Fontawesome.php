<?php

namespace owldesign\formbuilderintegrations\web\assets;

use Craft;
use craft\web\AssetBundle;

class Fontawesome extends AssetBundle
{
    public function init()
    {
        Craft::setAlias('@fbintegrations', '@vendor/owldesign/form-builder-integrations/lib/');

        $this->sourcePath = "@fbintegrations";

        $this->js = [
            'fontawesome/fa-light.min.js',
            'fontawesome/fa-regular.min.js',
            'fontawesome/fa-solid.min.js',
            'fontawesome/fontawesome.js'
        ];

        parent::init();
    }
}
