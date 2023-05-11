<?php

namespace App\Service;

use App\Dto\Incoming\CreateUpdateRoleDto;
use App\Dto\Outgoing\RoleDto;
use App\Entity\Role;
use App\Repository\RoleRepository;
use Psr\Log\LoggerInterface;


class RoleService extends AbstractDtoTransformers
{
    private RoleRepository $roleRepository;
//    private LoggerInterface $logger;

    /**
     * @param RoleRepository $roleRepository
     * @param LoggerInterface $logger
     */

    public function __construct(RoleRepository $roleRepository, LoggerInterface $logger)
    {
        $this->roleRepository = $roleRepository;
//        $this->logger = $logger;
    }

    public function createRole(CreateUpdateRoleDto $createRoleDto): ?RoleDto
    {
        $newRole = new Role();
        $newRole->setName($createRoleDto->getName());
        $this->roleRepository->save($newRole, true);

        return $this->transformToDto($newRole);
    }

    /**
     * @return RoleDto[]
     */
    public function getRoles(): iterable
    {
        $allUsers = $this->roleRepository->findAll();
        return $this->transformToDtos($allUsers);
    }

    public function getRole(int $role_id): ?RoleDto
    {
        $role = $this->roleRepository->find($role_id);
        return $this->transformToDto($role);
//        return $role;
    }

    public function updateRole(CreateUpdateRoleDto $updateRoleDto, int $id): ?RoleDto
    {
        $roleToUpdate = $this->roleRepository->find($id);
        if(!$roleToUpdate){
            return null;
        }
        $roleToUpdate->setName($updateRoleDto->getName());
        $this->roleRepository->save($roleToUpdate, true);

        return $this->transformToDto($roleToUpdate);
    }

    public function deleteRole(int $id): string
    {
        $roleToDelete = $this->roleRepository->find($id);
        if(!$roleToDelete){
            return "Role ID {$id} does not exist";
        }
        $this->roleRepository->remove($roleToDelete, true);

        return "Role ID {$id} is deleted";
    }

    public function transformToDto($object): RoleDto
    {
        return new RoleDto($object->getId(), $object->getName());
    }

}