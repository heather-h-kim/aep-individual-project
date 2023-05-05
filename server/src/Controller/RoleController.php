<?php

namespace App\Controller;

use JsonException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use App\Service\RoleService;
use App\Dto\Incoming\CreateUpdateRoleDto;

class RoleController extends ApiController
{
    private RoleService $roleService;

    public function __construct(SerializationService $serializationService, RoleService $roleService)
    {
        parent::__construct($serializationService);
        $this->roleService = $roleService;
    }

    /**
     * @throws InvalidRequestDataException
     * @throws JsonException
     */

    #[Route('api/roles',methods: ('POST'))]
    public function createRole(Request $request): Response
    {
        /**
         * @var CreateUpdateRoleDto $dto
         */
        $dto = $this->getValidatedDto($request, CreateUpdateRoleDto::class);
        return $this->json($this->roleService->createRole($dto));
    }

    #[Route('api/roles',methods: ('GET'))]
    public function getRoles(): Response
    {
        return $this->json($this->roleService->getRoles());
    }

    #[Route('api/roles/{id}',methods: ('GET'))]
    public function getOneRole(int $id): Response
    {
        return $this->json($this->roleService->getRole($id));
    }

    /**
     * @throws InvalidRequestDataException
     * @throws JsonException
     */
    #[Route('api/roles/{id}', methods: ['PATCH', 'PUT'])]
    public function updateRole(Request $request, int $id): Response
    {
        /**
         * @var CreateUpdateRoleDto $dto
         */
        $dto = $this->getValidatedDto($request, CreateUpdateRoleDto::class);
        return $this->json($this->roleService->updateRole($dto, $id));
    }

    #[Route('api/roles/{id}', methods: ['DELETE'])]
    public function deleteRole(int $id): Response
    {
        return $this->json($this->roleService->deleteRole($id));
    }


}
