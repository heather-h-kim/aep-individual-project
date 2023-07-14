<?php

namespace App\Service;
use App\Dto\Incoming\UpdateSeasonDto;
use App\Dto\Outgoing\SeasonDto;
use App\Dto\Incoming\CreateSeasonDto;
use App\Entity\Season;
use App\Repository\SeasonRepository;
use DateTime;
use Doctrine\ORM\NonUniqueResultException;

class SeasonService extends AbstractDtoTransformers
{
    private SeasonRepository $seasonRepository;

    /**
     * @param SeasonRepository $seasonRepository
     */
    public function __construct(SeasonRepository $seasonRepository)
    {
        $this->seasonRepository = $seasonRepository;
    }

    public function getAllSeasons(): iterable{
        $allSeasons = $this->seasonRepository->findAll();
        return $this->transformToDtos($allSeasons);
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

        $start_date_timestamp = $createSeasonDto->getStartDate();
        $end_date_timestamp = $createSeasonDto->getEndDate();

        $start_date = new DateTime();
        $start_date->setTimestamp($start_date_timestamp);

        $end_date = new DateTime();
        $end_date->setTimestamp($end_date_timestamp);

        $newSeason->setStartDate($start_date);
        $newSeason->setEndDate($end_date);

        $this->seasonRepository->save($newSeason, true);

        return $this->transformToDto($newSeason);
    }

    public function updateSeason(UpdateSeasonDto $updateSeasonDto): SeasonDto
    {
        $season_id = $updateSeasonDto->getSeasonId();
        $start_date_timestamp = $updateSeasonDto->getStartDate();
        $end_date_timestamp = $updateSeasonDto->getEndDate();

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

        return $this->transformToDto($seasonToUpdate);
    }

    public function deleteSeason(int $id): string
    {
        $seasonToDelete = $this->seasonRepository->find($id);

        if(!$seasonToDelete){
            return "Season {$id} does not exist";
        }

        $this->seasonRepository->remove($seasonToDelete, true);
        return "Season {$id} is deleted";
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