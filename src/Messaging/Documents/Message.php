<?php

namespace Messaging\Documents;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use DateTime;

/** @ODM\Document(collection="messages") */
class Message
{
    /** @ODM\Id */
    public $id;

    /** @ODM\String */
    public $text;

    /** @ODM\Timestamp */
    public $date;

    /** @ODM\String */
    public $image;

//    static $fields =

    public function __construct()
    {
    }

//    public function getId()
//    {
//        return $this->id;
//    }
//
//    public function getText()
//    {
//        return $this->text;
//    }
//
//    public function setText($text)
//    {
//        $this->text = $text;
//    }
//
//    public function getDate()
//    {
//        return $this->date;
//    }
//
//    public function setDate($timestamp)
//    {
//        $this->date = $timestamp;
//    }
//
//    public function getImage()
//    {
//        return $this->image;
//    }
//
//    public function setImage($image)
//    {
//        $this->image = $image;
//    }
}