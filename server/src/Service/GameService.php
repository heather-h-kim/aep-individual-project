<?php

namespace App\Service;

use App\Dto\Incoming\CreateGameLevelRoundDto;
use App\Dto\Incoming\CreateLevelDto;
use App\Dto\Incoming\CreateRoundDto;
use App\Entity\Game;
use App\Repository\GameRepository;
use App\Repository\SeasonRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\NonUniqueResultException;
use App\Dto\Outgoing\GameDto;

class GameService extends AbstractDtoTransformers
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
     * @throws \Exception
     */
    public function createGameLevelsRounds(CreateGameLevelRoundDto $createGameRoundDto): int
    {
        $newGame = new Game();

        //get info for the user field
        $user_id = $createGameRoundDto->getUserId();
        $user = $this->userRepository->find($user_id);

        //get info for the played_at and season fields
        $currentDate = new DateTime('now');
        $season = $this->seasonRepository->findOneByCurrentDate($currentDate);

        //update newGame
        $newGame->setUser($user);
        $newGame->setSeason($season);
        $newGame->setPlayedAt($currentDate);

        $this->gameRepository->save($newGame, true);

        /**
         * @var CreateLevelDto[] $levels
         * @var CreateLevelDto $levelDto
         * @var CreateRoundDto[] $rounds
         * @var CreateRoundDto $roundDto
         */

        //$levels = an array of LevelDtos
        $levels = $createGameRoundDto->getLevelsRounds();

        //score variable to calculate score for all rounds played
        $score = 0;

        //create levels played
        foreach( $levels as $levelDto){
            $newLevel = $this->levelService->createLevel($levelDto, $newGame);

            //rounds = an array of RoundDtos
            $rounds = $levelDto->getRounds();

            //create rounds played
            foreach( $rounds as $roundDto){
               $newRound=$this->roundService->createRound($roundDto, $newLevel);

               //calculate score
               $unit_score = $newRound->getLevel()->getLevelLookupId()->getUnitScore();
               if($newRound->getNumberShown() === $newRound->getNumberEntered()){
                   $score = $score+$unit_score;
               }
            }
        }

        return $score;
    }

    public function getGames():iterable
    {
        $allGames = $this->gameRepository->findAll();
        return $this->transformToDtos($allGames);
    }

    public function getGamesBySeasonAndUser(int $seasonId, int $userId): iterable
    {
        return $this->gameRepository->findBy(['season' => $seasonId, 'user' => $userId]);
    }

    public function transformToDto($object): GameDto
    {
        return new GameDto($object->getId(), $object->getSeason(), $object->getUser());
    }
}