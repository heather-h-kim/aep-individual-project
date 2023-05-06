<?php

namespace App\Service;

use App\Dto\Incoming\CreateUserDto;
use App\Dto\Incoming\UpdateUserDto;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class UserService
{
    private RoleService $roleService;
    private UserRepository $userRepository;


    public function __construct(RoleService $roleService, UserRepository $userRepository)
    {
        $this->roleService = $roleService;
        $this->userRepository = $userRepository;
    }

    public function createUser(CreateUserDto $createUserDto): ?User
    {
        $role = $this->roleService->getRole($createUserDto->getRoleId());
        if(!$role){
            throw new BadRequestHttpException('Role not found');
        }
        $newUser = new User();
        $newUser->setFirstName($createUserDto->getFirstName());
        $newUser->setLastName($createUserDto->getLastName());
        $newUser->setEmail($createUserDto->getEmail());
        $newUser->setFgcolor($createUserDto->getFgColor());
        $newUser->setBgcolor($createUserDto->getBgColor());
        $newUser->setRole($role);
        $this->userRepository->save($newUser,true);

        return $newUser;
    }

    public function getUsers(): array
    {
        return $this->userRepository->findAll();
    }

    public function getUser(int $id): ?User
    {
        return $this->userRepository->find($id);
    }

    public function updateUser(CreateUserDto $createUserDto, int $id): ?User
    {
//        $first_name = $createUserDto->getFirstName() ?? null;
//        $last_name = $createUserDto->getLastName() ?? null;
//        $email = $createUserDto->getEmail() ?? null;
//        $fgcolor = $createUserDto->getFgcolor() ?? null;
//        $bgcolor = $createUserDto->getBgcolor() ?? null;
//        $role_id = $createUserDto->getRoleId() ?? null;

//        $first_name = $createUserDto->getFirstName();
//        $last_name = $createUserDto->getLastName();
//        $email = $createUserDto->getEmail();
//        $fgcolor = $createUserDto->getFgcolor();
//        $bgcolor = $createUserDto->getBgcolor();
//        $role_id = $createUserDto->getRoleId();

        $role = $this->roleService->getRole($createUserDto->getRoleId());

        $userToUpdate = $this->userRepository->find($id);
        $userToUpdate->setFirstName($createUserDto->getFirstName());
        $userToUpdate->setLastName($createUserDto->getLastName());
        $userToUpdate->setEmail($createUserDto->getEmail());
        $userToUpdate->setFgcolor($createUserDto->getFgcolor());
        $userToUpdate->setBgcolor($createUserDto->getBgcolor());
        $userToUpdate->setRole($role);


//        if(!$userToUpdate){
//            return null;
//        }
//        if($first_name){
//            $userToUpdate->setFirstName($first_name);
//        }
//        if($last_name){
//            $userToUpdate->setLastName($last_name);
//        }
//        if($email){
//            $userToUpdate->setEmail($email);
//        }
//        if($fgcolor){
//            $userToUpdate->setFgcolor($fgcolor);
//        }
//        if($bgcolor){
//            $userToUpdate->setBgcolor($bgcolor);
//        }
//        if($role_id){
//            $role = $this->roleService->getRole($role_id);
//            $userToUpdate->setRole($role);
//        }

        $this->userRepository->save($userToUpdate, true);

        return $userToUpdate;
    }

    public function deleteUser(int $id): string
    {
        $userToDelete = $this->userRepository->find($id);
        if(!$userToDelete){
            return "User ID {$id} does not exist";
        }
        $this->userRepository->remove($userToDelete, true);

        return "User ID {$id} is deleted";
    }

}