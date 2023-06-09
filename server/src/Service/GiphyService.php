<?php

namespace App\Service;

use Symfony\Component\Dotenv\Dotenv;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class GiphyService
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
    public function getGif(): array
    {
            $apiKey = $_ENV['GIPHY_API_KEY'];
            $offset = rand(0, 4999);

        $response = $this->client->request(
            'GET',
            'https://api.giphy.com/v1/gifs/search', [
                'query'=> [
                    'api_key'=> $apiKey,
                    'q'=> 'cat',
                    'limit'=> 2,
                    'offset'=> $offset,
                    'rating'=> 'g',
                    'lang' => 'en',
                    'bundle' => 'messaging_non_clips'
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