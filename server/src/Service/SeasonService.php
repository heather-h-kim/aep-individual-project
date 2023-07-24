<?php

namespace App\Service;
use App\Dto\Incoming\DeleteSeasonDto;
use App\Dto\Incoming\UpdateSeasonDto;
use App\Dto\Outgoing\SeasonDto;
use App\Dto\Incoming\CreateSeasonDto;
use App\Entity\Season;
use App\Repository\GameRepository;
use App\Repository\SeasonRepository;
use DateTime;
use Doctrine\ORM\NonUniqueResultException;

class SeasonService extends AbstractDtoTransformers
{
    private SeasonRepository $seasonRepository;
    private GameRepository $gameRepository;

    /**
     * @param SeasonRepository $seasonRepository
     */
    public function __construct(SeasonRepository $seasonRepository, GameRepository $gameRepository)
    {
        $this->seasonRepository = $seasonRepository;
        $this->gameRepository = $gameRepository;
    }

    public function getAllSeasons(): iterable{
        $allSeasons = $this->seasonRepository->findAllOrderedByStartDate();
        return $this->transformToDtos($allSeasons);
    }

    public function getSeasonsToDate(): iterable{
        $currentDate= new DateTime('now');
        $seasons = $this->seasonRepository->findAllSeasonsToDate($currentDate);
        return $this->transformToDtos($seasons);
    }

    public function getSeasonById(int $id): SeasonDto
    {
        $season = $this->seasonRepository->find($id);
        return $this->transformToDto($season);
    }

    /**
     * @throws NonUniqueResultException
     */
    public function getSeasonByCurrentDate(): SeasonDto{
        $currentDate= new DateTime('now');
        $season = $this->seasonRepository->findOneByCurrentDate($currentDate);

        return $this->transformToDto($season);
    }

    /**
     * @throws \Exception
     */
    public function createSeason(CreateSeasonDto $createSeasonDto): SeasonDto
    {
        $newSeason = new Season();

        $startDateTimestamp = ($createSeasonDto->getStartDate()) / 1000;
        $endDateTimestamp = ($createSeasonDto->getEndDate()) / 1000;

        $startDate = new DateTime();
        $startDate->setTimestamp($startDateTimestamp);

        $endDate = new DateTime();
        $endDate->setTimestamp($endDateTimestamp);

        $newSeason->setStartDate($startDate);
        $newSeason->setEndDate($endDate);

        $this->seasonRepository->save($newSeason, true);

        $seasonlessGames = $this->gameRepository->findALLByNullSeason($startDate, $endDate);

        foreach($seasonlessGames as $game){
            $game->setSeason($newSeason);
            $this->gameRepository->save($game, true);
        }


        return $this->transformToDto($newSeason);
    }

    public function updateSeason(UpdateSeasonDto $updateSeasonDto): SeasonDto
    {
        $season_id = $updateSeasonDto->getSeasonId();
        $start_date_timestamp = ($updateSeasonDto->getStartDate())/1000;
        $end_date_timestamp = ($updateSeasonDto->getEndDate())/1000;

        $seasonToUpdate = $this->seasonRepository->find($season_id);

        if($start_date_timestamp){
            $start_date = new DateTime();
            $start_date->setTimestamp($start_date_timestamp);
            $seasonToUpdate->setStartDate($start_date);
        }

        if($end_date_timestamp){
            $end_date = new DateTime();
            $end_date->setTimestamp($end_date_timestamp);
            $seasonToUpdate->setEndDate($end_date);
        }

        $this->seasonRepository->save($seasonToUpdate, true);


        $start_date = $seasonToUpdate->getStartDate();
        $end_date = $seasonToUpdate->getEndDate();

        $seasonlessGames = $this->gameRepository->findALLBySeason($start_date, $end_date);
        foreach($seasonlessGames as $game){
            $game->setSeason($seasonToUpdate);
            $this->gameRepository->save($game, true);
        }

        if($updateSeasonDto->getNextStartDate()) {
            $nextStartDateTimestamp = ($updateSeasonDto->getNextStartDate()) / 1000;
            $nextStartDate = new DateTime();
            $nextStartDate->setTimestamp($nextStartDateTimestamp);
            $games = $this->gameRepository->findALLBySeason($end_date, $nextStartDate);

            foreach ($games as $game) {
                $game->setSeason(null);
                $this->gameRepository->save($game, true);
            }
        }

        if($updateSeasonDto->getPrevEndDate()){
            $prevEndDateTimestamp = ($updateSeasonDto->getPrevEndDate())/1000;
            $prevEndDate = new DateTime();
            $prevEndDate->setTimestamp($prevEndDateTimestamp);
            $games = $this->gameRepository->findALLBySeason($prevEndDate, $start_date);

            foreach ($games as $game) {
                $game->setSeason(null);
                $this->gameRepository->save($game, true);
            }
        }

        return $this->transformToDto($seasonToUpdate);
    }

    public function deleteSeason(int $seasonId): string
    {
        $seasonToDelete = $this->seasonRepository->find($seasonId);

        if(!$seasonToDelete){
            return "Season {$seasonId} does not exist";
        }

        //update seasonId to null for the games that belong to the season to delete to prevent the foreign key error
        $games = $seasonToDelete->getGames();

        foreach($games as $game){
            $game->setSeason(null);
            $this->gameRepository->save($game, true);
        }

        $this->seasonRepository->remove($seasonToDelete, true);
        return "Season {$seasonId} is deleted";
    }

    public function transformToDto($object): SeasonDto
    {
        return new SeasonDto(
            $object->getId(),
            $object->getStartDate(),
            $object->getEndDate()
        );
    }

}