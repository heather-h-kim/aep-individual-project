<?php

namespace App\Controller;

use App\Dto\Incoming\CreateUserDto;
use App\Dto\Incoming\UpdateUserDto;
use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use App\Service\UserService;
use Exception;
use JsonException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;



class UserController extends ApiController
{
    private UserService $userService;

    public function __construct(SerializationService $serializationService, UserService $userService)
    {
        parent::__construct($serializationService);
        $this->userService = $userService;
    }

    /**
     * @throws Exception
     */

    #[Route('api/user', methods: ['POST'])]
    public function createUser(Request $request): Response
    {
        try {
            /**
             * @var CreateUserDto $incomingDto
             */
            $incomingDto = $this->getValidatedDto($request, CreateUserDto::class);
            $outgoingDto= $this->userService->createUser($incomingDto);
        } catch (Exception $e){
            $this->json($e->getMessage());
        }

        return $this->json($outgoingDto);
    }


    #[Route('api/users', methods: ['GET'])]
    public function getUsers(): Response
    {
        return $this->json($this->userService->getUsers());
    }

    #[Route('api/user/id/{id}', methods: ['GET'])]
    public function getUserById(int $id): Response
    {
        return $this->json($this->userService->getUserById($id));
    }

    #[Route('api/user/auth0/{token}', methods: ['GET'])]
    public function getUserByToken(string $token): Response
    {
        return $this->json($this->userService->getUserByToken($token));
    }


    /**
     * @throws Exception
     */

    #[Route('api/user', methods: ['PATCH', 'PUT'])]
    public function updateUser(Request $request): Response
    {
        try{
            /**
            * @var UpdateUserDto $incomingDto
            */
        $incomingDto = $this->getValidatedDto($request, UpdateUserDto::class);
        $outgoingDto = $this->userService->updateUser($incomingDto);

        } catch (Exception $e) {
            return $this->json($e->getMessage());
        }

        return $this->json($outgoingDto);
    }

    /**
     * @throws Exception
     */

    #[Route('api/user/{id}', methods: ['DELETE'])]
    public function deleteUser(int $id): Response
    {
        try{
            $result = $this->userService->deleteUser($id);
        } catch (Exception $e) {
            return $this->json($e->getMessage());
        }
        return $this->json($result);
    }

}
