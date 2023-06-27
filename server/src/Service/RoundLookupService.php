<?php

namespace App\Service;

use App\Dto\Outgoing\RoundLookupDto;
use App\Repository\RoundLookupRepository;

class RoundLookupService extends AbstractDtoTransformers
{
    private RoundLookupRepository $roundLookupRepository;

    public function __construct(RoundLookupRepository $roundLookupRepository) {
        $this->roundLookupRepository = $roundLookupRepository;
    }

    public function getRoundNumbers() : iterable {
        $allRoundNumbers = $this->roundLookupRepository->findAll();
        return $this->transformToDtos($allRoundNumbers);
    }

    public function getRoundNumberById(int $id): RoundLookupDto
    {
        $roundNumber=$this->roundLookupRepository->find($id);
        return $this->transformToDto($roundNumber);
    }

    public function transformToDto($object): RoundLookupDto
    {
        return new RoundLookupDto(
            $object->getId(),
            $object->getRoundNumber(),
        );
    }
}
