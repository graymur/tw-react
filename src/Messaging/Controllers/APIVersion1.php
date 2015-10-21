<?php

namespace Messaging\Controllers;

use Silex\Application;
use Silex\Route;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\Request;

class APIVersion1 implements ControllerProviderInterface
{
    /**
     * @var \Doctrine\ODM\MongoDB\DocumentManager
     */
    private $dm;

    /**
     * @var Application
     */
    private $app;

    public function __construct()
    {
        $this->dm = getDM();
    }

    /**
     * @return \MongoDB
     */
//    public function getDb()
//    {
//        $m = new \MongoClient(); // соединение
//        return $m->selectDb('tw-react'); // получаем базу данных "foo"
//    }

    public function connect(Application $app)
    {
        $this->app = $app;

        // api v1
        $api = new ControllerCollection(new Route());

        $api->get('/{model}', __CLASS__ . '::listAction')
            ->assert('model', '^([a-z]+)$')
        ;

        $api->get('/{model}/{id}', __CLASS__ . '::itemAction')
            ->assert('model', '^([a-z]+)$')
            ->assert('id', '^([a-z0-9]+)$')
        ;

        $api->delete('/{model}/{id}', __CLASS__ . '::deleteAction')
            ->assert('model', '^([a-z]+)$')
            ->assert('id', '^([a-z0-9]+)$')
        ;

        $api->put('/{model}/{id}', __CLASS__ . '::updateAction')
            ->assert('model', '^([a-z]+)$')
            ->assert('id', '^([a-z0-9]+)$')
        ;

        $api->post('/{model}', __CLASS__ . '::createAction')
            ->assert('model', '^([a-z]+)$')
        ;

        return $api;
    }

    public function listAction(Application $app, $model)
    {
        $model = $this->checkModel($model);

        $list = $this->dm->getRepository($model)->findBy(array(), array('date' => -1));

        return $app->json($list, 201);
    }

    public function itemAction(Application $app, $model, $id)
    {
        $model = $this->checkModel($model);

        if (!$item = $this->dm->getRepository($model)->find(new \MongoId($id)))
        {
            throw new \Exception;
        }

        return $app->json($item, 201);
    }

    public function deleteAction(Application $app, $model, $id)
    {
        $model = $this->checkModel($model);

        if (!$item = $this->dm->getRepository($model)->find(new \MongoId($id)))
        {
            throw new \Exception;
        }

        $this->dm->remove($item);
        $this->dm->flush();

        return $app->json(array('id' => $item->id), 201);
    }

    public function updateAction(Application $app, $model, $id)
    {
        return "Update $model $id";
    }

    public function createAction(Application $app, Request $request, $model)
    {
        $model = $this->checkModel($model);

        $message = new $model;

        $message->text = $request->get('text');
        $message->date = time();

        $this->dm->persist($message);
        $this->dm->flush();

        if (!$message->id)
        {
            throw new \Exception;
        }

        return $app->json($message, 201);
    }

    private function checkModel($model)
    {
        $model = 'Messaging\\Documents\\' . ucfirst($model);

        if (!class_exists($model))
        {
            throw new \Exception;
        }

        return $model;
    }
}

