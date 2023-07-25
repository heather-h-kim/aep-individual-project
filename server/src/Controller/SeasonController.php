<?php

namespace App\Controller;

use App\Dto\Incoming\CreateSeasonDto;
use App\Dto\Incoming\UpdateSeasonDto;
use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use App\Service\SeasonService;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class SeasonController extends ApiController
{
    private SeasonService $seasonService;

    /**
     * @param SerializationService $serializationService
     * @param SeasonService $seasonService
     */
    public function __construct(SerializationService $serializationService, SeasonService $seasonService)
    {
        parent::__construct($serializationService);
        $this->seasonService = $seasonService;
    }

    /**
     * @throws \JsonException
     * @throws InvalidRequestDataException
     * @throws \Exception
     */
    #[Route('api/season', methods:['POST'])]
    public function createSeason(Request $request): Response
    {
        /**
         * @var CreateSeasonDto $dto
         */
        $dto = $this->getValidatedDto($request, CreateSeasonDto::class);
        return $this->json($this->seasonService->createSeason($dto));
    }

    /**
     * @throws NonUniqueResultException
     */
    #[Route('api/season/currentSeason', methods:['GET'])]
    public function getCurrentSeason(Request $request): Response
    {
        return $this->json($this->seasonService->getCurrentSeason());
    }

    #[Route('api/seasons', methods:['GET'])]
    public function getAllSeasons(): Response
    {
        return $this->json($this->seasonService->getAllSeasons());
    }

    #[Route('api/season/{seasonId}', methods:['DELETE'])]
    public function deleteSeason(int $seasonId): Response
    {
        return $this->json($this->seasonService->deleteSeason($seasonId));
    }

    /**
     * @throws \JsonException
     * @throws InvalidRequestDataException
     */
    #[Route('api/season', methods:['PATCH'])]
    /**
     * @var UpdateSeasonDto $dto
     */
    public function updateSeason(Request $request): Response
    {
        $dto = $this->getValidatedDto($request, UpdateSeasonDto::class);
        return $this->json($this->seasonService->updateSeason($dto));
    }

    #[Route('api/seasons/toDate', methods:['GET'])]
    public function getSeasonsToDate(): Response
    {
        return $this->json($this->seasonService->getSeasonsToDate());
    }





}