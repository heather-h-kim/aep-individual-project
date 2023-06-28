<?php

namespace App\Service;

use App\Dto\Incoming\CreateGameRoundDto;
use App\Entity\Game;
use App\Repository\GameRepository;
use App\Repository\SeasonRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\NonUniqueResultException;

class GameService
{
    private GameRepository $gameRepository;
    private SeasonRepository $seasonRepository;
    private UserRepository $userRepository;
    private LevelService $levelService;

    /**
     * @param GameRepository $gameRepository
     */
    public function __construct(GameRepository $gameRepository, SeasonRepository $seasonRepository, UserRepository $userRepository, LevelService $levelService)
    {
        $this->gameRepository = $gameRepository;
        $this->seasonRepository = $seasonRepository;
        $this->userRepository = $userRepository;
        $this->levelService = $levelService;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function createGame(CreateGameRoundDto $createGameRoundDto): int
    {
        $newGame = new Game();
        $user_id = $createGameRoundDto->getUserId();
        $user = $this->userRepository->find($user_id);

        $currentDate = new DateTime('now');
        $season = $this->seasonRepository->findOneByCurrentDate($currentDate);

        $newGame->setUserId($user);
        $newGame->setSeasonId($season);
        $newGame->setPlayedAt($currentDate);

        $game_id =  $newGame->getId();

        // $levels = an array of LevelDtos
        $levels = $createGameRoundDto->getLevelsRounds();

        //$level = LevelDto
        foreach( $levels as $level){
           $createdLevel = $this->levelService->createLevel($level);
           $createdLevel->setGameId($game_id);
        }


    }




}