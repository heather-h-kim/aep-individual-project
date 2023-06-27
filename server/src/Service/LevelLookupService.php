<?php

namespace App\Service;
use App\Dto\Incoming\CreateUpdateLevelLookupDto;
use App\Dto\Outgoing\LevelLookupDto;
use App\Repository\LevelLookupRepository;
use App\Entity\LevelLookup;


class LevelLookupService extends AbstractDtoTransformers
{
    private LevelLookupRepository $levelLookupRepository;

    public function __construct(LevelLookupRepository $levelLookupRepository) {
        $this->levelLookupRepository = $levelLookupRepository;
    }

    public function getLevelNumbers() : iterable {
        $allLevelNumbers = $this->levelLookupRepository->findAll();
        return $this->transformToDtos($allLevelNumbers);
    }

    public function getLevelNumberById(int $id): LevelLookupDto
    {
        $level=$this->levelLookupRepository->find($id);
        return $this->transformToDto($level);
    }

    public function transformToDto($object): LevelLookupDto
    {
        return new LevelLookupDto(
            $object->getId(),
            $object->getLevelNumber(),
            $object->getUnitScore()
        );
    }
}