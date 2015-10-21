<?php

require_once __DIR__ . '/../../../lib/lib_common.php';

require_once __DIR__ . '/../../vendor/autoload.php';

use Doctrine\MongoDB\Connection;
use Doctrine\ODM\MongoDB\Configuration;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver;

/**
 * @return DocumentManager
 */
function getDM()
{
    static $dm;

    if (!isset($dm))
    {
        $connection = new Connection();

        $config = new Configuration();
        $config->setProxyDir(__DIR__ . '/Proxies');
        $config->setProxyNamespace('Proxies');
        $config->setHydratorDir(__DIR__ . '/Hydrators');
        $config->setHydratorNamespace('Hydrators');
        $config->setDefaultDB('tw-react');
        $config->setMetadataDriverImpl(AnnotationDriver::create(__DIR__ . '/Documents'));

        AnnotationDriver::registerAnnotationClasses();

        $dm = DocumentManager::create($connection, $config);
    }

    return $dm;
}
