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
use DateTimeZone;
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
        $currentDate = new DateTime('now', new DateTimeZone('UTC'));
//        $currentDate = new DateTime('now');
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

    public function getRankingBySeason(int $seasonId): array
    {
        //get games for the season
        $games =  $this->gameRepository->findBy(['season' => $seasonId], ['user'=> 'ASC']);

        //create an associative array of user=>topScore pairs
        $array = [];

        foreach($games as $game){
            $calculatedScore = $this->calculateScorePerGame($game);

            //push a new user=>topScore pair into $array if there's no key=>value pair for the user or the existing value is smaller than the current score
            if(!isset($array[$game->getUser()->getUsername()]) || $array[$game->getUser()->getUsername()] < $calculatedScore){
                $array[$game->getUser()->getUsername()] = $this->calculateScorePerGame($game);
            }
        }

        //convert the associative array ($array) into an array of objects (UserTopScoreDto)
        $finalArray = [];
        arsort($array);
        foreach($array as $key=>$value){
            $finalArray[] = $this->transformToUserTopScoreDto(1, $key, $value);
        }

        //update rank for each user, taking account of multiple identical top scores
        foreach($finalArray as $obj){
            if(array_search($obj, $finalArray)>0){
                if($finalArray[array_search($obj, $finalArray) -1]->getTopScore() > $obj->getTopScore()){
                $obj->setRank(($finalArray[array_search($obj, $finalArray) -1]->getRank() )+ 1);
                }
                if($finalArray[array_search($obj, $finalArray) -1]->getTopScore() == $obj->getTopScore()){
                    $obj->setRank($finalArray[array_search($obj, $finalArray) -1]->getRank());
                }
            }
        }

//        $finalArray = array_map(static function ($key, $value){ $this->transformToUserTopScoreDto($key, $value);}, $array);

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

    public function transformToUserTopScoreDto(int $rank, string $username, int $topScore): UserTopScoreDto
    {
        return new UserTopScoreDto($rank, $username, $topScore);
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