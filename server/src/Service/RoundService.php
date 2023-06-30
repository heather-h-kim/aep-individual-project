<?php

namespace App\Service;

use App\Dto\Incoming\CreateRoundDto;
use App\Entity\Level;
use App\Entity\Round;
use App\Repository\RoundLookupRepository;
use App\Repository\RoundRepository;

class RoundService
{
private RoundRepository $roundRepository;
private RoundLookupRepository $roundLookupRepository;

    /**
     * @param RoundRepository $roundRepository
     * @param RoundLookupRepository $roundLookupRepository
     */
    public function __construct(RoundRepository $roundRepository, RoundLookupRepository $roundLookupRepository)
    {
        $this->roundRepository = $roundRepository;
        $this->roundLookupRepository = $roundLookupRepository;
    }

    public function createRound(CreateRoundDto $roundDto, Level $level): Round
    {
        $round = new Round();
        $round_number = $roundDto->getRoundNumber();
        $round_lookup_id = $this->roundLookupRepository->findOneBy(['round_number'=>$round_number]);
        $number_shown = $roundDto->getNumberShown();
        $number_entered = $roundDto->getNumberEntered();

        $round->setRoundLookupId($round_lookup_id);
        $round->setNumberShown($number_shown);
        $round->setNumberEntered($number_entered);
        $round->setLevelId($level);

        $this->roundRepository->save($round, true);

        return $round;
    }

}