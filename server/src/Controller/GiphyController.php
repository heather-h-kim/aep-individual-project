<?php

namespace App\Controller;

use App\Serialization\SerializationService;
use App\Service\GiphyService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class GiphyController extends ApiController
{
    private GiphyService $giphyService;

    public function __construct(SerializationService $serializationService, GiphyService $giphyService)
    {
        parent::__construct($serializationService);
        $this->giphyService = $giphyService;
    }

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    #[Route('api/giphy',methods: ['GET'])]
    public function getGif(): Response
    {
        return $this->json($this->giphyService->getGif());
    }
}