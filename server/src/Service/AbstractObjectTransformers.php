<?php

namespace App\Service;

abstract class AbstractObjectTransformers implements ObjectTransformerInterface
{
    public function transformFromObjects(iterable $objects): iterable
    {
        $dto = [];
        foreach( $objects as $object) {
            $dto[] = $this->transformFromObject($object);
        }

        return $dto;
    }

}