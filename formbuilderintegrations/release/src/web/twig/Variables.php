<?php

namespace owldesign\formbuilderintegrations\web\twig;


use owldesign\formbuilderintegrations\Integrations;
use yii\base\Behavior;

class Variables extends Behavior
{

    public $fbi;

    public function init()
    {
        parent::init();

        $this->fbi = Integrations::getInstance();
    }
}