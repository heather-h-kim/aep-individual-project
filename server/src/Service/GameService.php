<?php

namespace App\Service;

use App\Dto\Incoming\CreateGameRoundDto;
use App\Dto\Incoming\LevelDto;
use App\Dto\Incoming\RoundDto;
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
    private RoundService $roundService;

    /**
     * @param GameRepository $gameRepository
     */
    public function __construct(GameRepository $gameRepository, SeasonRepository $seasonRepository, UserRepository $userRepository, LevelService $levelService, RoundService $roundService)
    {
        $this->gameRepository = $gameRepository;
        $this->seasonRepository = $seasonRepository;
        $this->userRepository = $userRepository;
        $this->levelService = $levelService;
        $this->roundService = $roundService;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function createGameLevelsRounds(CreateGameRoundDto $createGameRoundDto): string
    {
        $newGame = new Game();
        $user_id = $createGameRoundDto->getUserId();
        $user = $this->userRepository->find($user_id);

        $currentDate = new DateTime('now');
        $season = $this->seasonRepository->findOneByCurrentDate($currentDate);

        $newGame->setUserId($user);
        $newGame->setSeasonId($season);
        $newGame->setPlayedAt($currentDate);

        $this->gameRepository->save($newGame, true);


        /**
         * @var LevelDto[] $levels
         * @var LevelDto $levelDto
         * @var RoundDto[] $rounds
         * @var RoundDto $roundDto
         */

        /** $levels = an array of LevelDtos */
        $levels = $createGameRoundDto->getLevelsRounds();

        foreach( $levels as $levelDto){

            $newLevel = $this->levelService->createLevel($levelDto, $newGame);

            /**$rounds = an array of RoundDtos*/
            $rounds = $levelDto->getRounds();
            foreach( $rounds as $roundDto){
                $this->roundService->createRound($roundDto, $newLevel);
            }
        }

        return 'testing';
    }



    public function getGameById(int $id): Game
    {
        return $this->gameRepository->find($id);
    }




}