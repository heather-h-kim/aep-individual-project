<?php

namespace App\Controller;

use App\Serialization\SerializationService;
use App\Service\RandomFactService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class RandomFactController extends ApiController
{
    private RandomFactService $randomFactService;

    public function __construct(SerializationService $serializationService, RandomFactService $randomFactService)
    {
        parent::__construct($serializationService);
        $this->randomFactService = $randomFactService;
    }

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    #[Route('api/randomFacts',methods: ['GET'])]
    public function getRandomFacts(): Response
    {
        return $this->json($this->randomFactService->getRandomFacts());
    }
}