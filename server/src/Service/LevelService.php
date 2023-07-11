<?php

namespace App\Service;

use App\Dto\Incoming\CreateLevelDto;
use App\Entity\Game;
use App\Entity\Level;
use App\Repository\LevelLookupRepository;
use App\Repository\LevelRepository;

class LevelService
{
    private LevelRepository $levelRepository;
    private LevelLookupRepository $levelLookupRepository;

    /**
     * @param LevelRepository $levelRepository
     */
    public function __construct(LevelRepository $levelRepository, LevelLookupRepository $levelLookupRepository)
    {
        $this->levelRepository = $levelRepository;
        $this->levelLookupRepository = $levelLookupRepository;
    }

    public function createLevel(CreateLevelDto $levelDto, Game $game ): Level
    {
        $level = new Level();
        $level_number = $levelDto->getLevelNumber();
        $level_lookup_id = $this->levelLookupRepository->findOneBy(['level_number'=> $level_number]);

        $level->setLevelLookupId($level_lookup_id);
        $level->setGame($game);

        $this->levelRepository->save($level, true);

        return $level;
    }

}