<?php

namespace App\Service;

use App\Dto\Incoming\CreateGameLevelRoundDto;
use App\Dto\Incoming\CreateLevelDto;
use App\Dto\Incoming\CreateRoundDto;
use App\Dto\Outgoing\UserTopScoreDto;
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
    private SeasonService $seasonService;
    private UserService $userService;


    /**
     * @param GameRepository $gameRepository
     */
    public function __construct(GameRepository $gameRepository, SeasonRepository $seasonRepository, UserRepository $userRepository, LevelService $levelService, RoundService $roundService, SeasonService $seasonService, UserService $userService)
    {
        $this->gameRepository = $gameRepository;
        $this->seasonRepository = $seasonRepository;
        $this->userRepository = $userRepository;
        $this->levelService = $levelService;
        $this->roundService = $roundService;
        $this->seasonService = $seasonService;
        $this->userService = $userService;
    }

    /**
     * @throws NonUniqueResultException
     * @throws \Exception
     */
    public function createGameLevelsRounds(CreateGameLevelRoundDto $createGameRoundDto): int
    {
        $newGame = new Game();

        //get info for the user field
        $userId = $createGameRoundDto->getUserId();
        $user = $this->userRepository->find($userId);

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
               $unitScore = $newRound->getLevel()->getLevelLookupId()->getUnitScore();
               if($newRound->getNumberShown() === $newRound->getNumberEntered()){
                   $score = $score+$unitScore;
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

    public function getGamesBySeason(int $seasonId): array
    {
        $games =  $this->gameRepository->findBy(['season' => $seasonId], ['user'=> 'ASC']);

        $array = [];

        foreach($games as $game){
            $calculatedScore = $this->calculateScorePerGame($game);
            if(!isset($array[$game->getUser()->getId()]) || $array[$game->getUser()->getId()] < $calculatedScore){
                $array[$game->getUser()->getId()] = $this->calculateScorePerGame($game);
            }
        }


        $finalArray = [];
        arsort($array);
        foreach($array as $key=>$value){
            $finalArray[] = $this->transformToUserTopScoreDto($key, $value);
        }

//        $finalArray = array_map("$this->transformToUserTopScoreDto", $array);

       return $finalArray;

    }

    public function calculateScorePerGame(Game $game): int
    {
        $levels = $game->getLevels();
        $score = 0;

        foreach($levels as $level) {
            $unitScore = $level->getLevelLookupId()->getUnitScore();
            $rounds = $level->getRounds();

            foreach($rounds as $round) {
                if($round->getNumberShown() === $round->getNumberEntered()){
                    $score = $score+$unitScore;
                }
            }
        }
        return $score;
    }

    public function transformToUserTopScoreDto(int $user_id, int $top_score): UserTopScoreDto
    {
        return new UserTopScoreDto($user_id, $top_score);
    }

    public function transformToDto($object): GameDto
    {
        return new GameDto(
            $object->getId(),
            $this->seasonService->transformToDto($object->getSeason()),
            $this->userService->transformToDto($object->getUser()),
        );
    }

}