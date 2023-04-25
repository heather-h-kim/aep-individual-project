<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;

class Controller extends AbstractController
{
    #[Route('/')]
    #[Route('/health')]
    public function health(): Response {
        return new Response();
    }

    #[Route('/log/{name}')]
    public function log(string $name, LoggerInterface $logger): Response {
        // See these in /var/log/ of your project root
        $logger->info("Hello, $name");
        return $this->json([
            'success' => true,
            'name' => $name
        ]);
    }
}