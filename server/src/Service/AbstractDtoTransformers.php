<?php

namespace App\Service;

abstract class AbstractDtoTransformers implements DtoTransformerInterface
{
    public function transformToDtos(iterable $objects): iterable
    {
        $dto = [];
        foreach( $objects as $object) {
            $dto[] = $this->transformToDto($object);
        }

        return $dto;
    }

}