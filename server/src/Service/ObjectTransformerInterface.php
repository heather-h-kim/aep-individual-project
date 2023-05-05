<?php

namespace App\Service;

interface ObjectTransformerInterface
{
    public function transformFromObject($object);
    public function transformFromObjects(iterable $objects): iterable;
}

