<?php

namespace App\Service;

use App\Dto\Incoming\CreateUpdateRoleDto;
use App\Entity\Role;
use App\Repository\RoleRepository;
use Psr\Log\LoggerInterface;


class RoleService
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

    public function createRole(CreateUpdateRoleDto $createRoleDto): ?Role
    {
        $newRole = new Role();
        $newRole->setName($createRoleDto->getName());
        $this->roleRepository->save($newRole, true);

        return $newRole;
    }

    /**
     * @return Role[]
     */
    public function getRoles(): array
    {
        return $this->roleRepository->findAll();
    }

    public function getRole(int $role_id): ?Role
    {
        return $this->roleRepository->find($role_id);
    }

    public function updateRole(CreateUpdateRoleDto $updateRoleDto, int $id): ?Role
    {
        $roleToUpdate = $this->roleRepository->find($id);
        if(!$roleToUpdate){
            return null;
        }
        $roleToUpdate->setName($updateRoleDto->getName());
        $this->roleRepository->save($roleToUpdate, true);

        return $roleToUpdate;
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

}