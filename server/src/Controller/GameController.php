<?php

namespace App\Controller;

use App\Dto\Incoming\CreateGameLevelRoundDto;
use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\GameService;

class GameController extends ApiController
{
    private GameService $gameService;

    /**
     * @param GameService $gameService
     */
    public function __construct(SerializationService $serializationService, GameService $gameService)
    {
        parent::__construct($serializationService);
        $this->gameService = $gameService;
    }

    /**
     * @throws NonUniqueResultException
     * @throws \JsonException
     * @throws InvalidRequestDataException
     */
    #[Route('api/game', methods:['POST'])]
    public function createGameLevelsRounds(Request $request): Response
    {
        /**
         * @var CreateGameLevelRoundDto $dto
         */
        $dto = $this->getValidatedDto($request, CreateGameLevelRoundDto::class);
        $dto = $this->getValidatedDto($request, CreateGameLevelRoundDto::class);
        return $this->JSON($this->gameService->createGameLevelsRounds($dto));
    }

}