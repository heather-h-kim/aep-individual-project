<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class RandomFactService
{
    public function __construct(
        private HttpClientInterface $client,
    ) {
    }


    /**
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     */
    public function getRandomFacts(): array
    {
        $apiKey = $_ENV['RANDOM_FACT_API_KEY'];

        $response = $this->client->request(
            'GET',
            'https://api.api-ninjas.com/v1/facts', [
                'query'=> [
                    'limit'=> 1,
                ],
                'headers' => [
                    'X-Api-Key' => $apiKey
                ]
            ]
        );

        $statusCode = $response->getStatusCode();
        $contentType = $response->getHeaders()['content-type'][0];
        $content = $response->getContent();
        $content = $response->toArray();

        return $content;
    }
}