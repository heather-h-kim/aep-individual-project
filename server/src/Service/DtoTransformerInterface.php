<?php

namespace App\Service;

interface DtoTransformerInterface
{
    public function transformToDto($object);
    public function transformToDtos(iterable $objects): iterable;
}

