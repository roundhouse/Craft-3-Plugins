<?php

namespace roundhouse\emailbuilder\assets;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class EmailBuilder extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = '@roundhouse/emailbuilder/assets';

        $this->depends = [
            CpAsset::class
        ];

        $this->js = [
            'js/emailbuilder.js'
        ];

        $this->css = [
            'css/emailbuilder.css'
        ];

        parent::init();
    }
}