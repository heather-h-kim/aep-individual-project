<?php

namespace App\Controller;

use App\Dto\Incoming\CreateUserDto;
use App\Dto\Incoming\UpdateUserDto;
use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use App\Service\UserService;
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
     * @throws InvalidRequestDataException
     * @throws JsonException
     */

    #[Route('api/user', methods: ['POST'])]
    public function createUser(Request $request): Response
    {
        /**
         * @var CreateUserDto $dto
         */
        $dto = $this->getValidatedDto($request, CreateUserDto::class);
        return $this->json($this->userService->createUser($dto));
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
     * @throws JsonException
     * @throws InvalidRequestDataException
     */
    #[Route('api/user', methods: ['PATCH', 'PUT'])]
    public function updateUser(Request $request): Response
    {
        /**
         * @var UpdateUserDto $dto
         */
        $dto = $this->getValidatedDto($request, UpdateUserDto::class);
//        return $this->json($dto);
        return $this->json($this->userService->updateUser($dto));
    }

    #[Route('api/user/{id}', methods: ['DELETE'])]
    public function deleteUser(int $id): Response
    {
        return $this->json($this->userService->deleteUser($id));
    }

}
