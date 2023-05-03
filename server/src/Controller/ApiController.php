<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use JsonException;

class ApiController extends AbstractController
{
    private SerializationService $serializationService;

    public function __construct(SerializationService $serializationService) {
        $this->serializationService = $serializationService;
    }

   /**
    * @throws InvalidRequestDataException
    * @throws JsonException
    */

   protected function getValidatedDto(Request $request, string $class): object {
       return $this->serializationService->getValidatedDto($request, $class);
   }

}
