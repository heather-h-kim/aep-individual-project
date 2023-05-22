<?php

namespace App\Service;

use App\Dto\Incoming\CreateUserDto;
use App\Dto\Incoming\UpdateUserDto;
use App\Dto\Outgoing\UserDto;
use App\Entity\Role;
use App\Entity\User;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class UserService extends AbstractDtoTransformers
{
    private RoleService $roleService;
    private UserRepository $userRepository;
    private RoleRepository $roleRepository;


    public function __construct(RoleService $roleService, UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $this->roleService = $roleService;
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    public function createUser(CreateUserDto $createUserDto): ?UserDto
    {
        $role = $this->roleRepository->find($createUserDto->getRoleId());

        if(!$role){
            throw new BadRequestHttpException('Role not found');
        }
        $newUser = new User();
        $newUser->setFirstName($createUserDto->getFirstName());
        $newUser->setLastName($createUserDto->getLastName());
        $newUser->setEmail($createUserDto->getEmail());
        $newUser->setFgcolor($createUserDto->getFgColor());
        $newUser->setBgcolor($createUserDto->getBgColor());
        $newUser->setUsername($createUserDto->getUsername());
        $newUser->setAuth0token($createUserDto->getAuth0token());
        $newUser->setRole($role);
        $this->userRepository->save($newUser,true);

        return $this->transformToDto($newUser);
    }

    public function getUsers(): iterable
    {
        $allUsers = $this->userRepository->findAll();
        return $this->transformToDtos($allUsers);
    }

    public function getUserById(int $id): ?UserDto
    {
        $user = $this->userRepository->find($id);
        return $this->transformToDto($user);
    }

    public function getUserByEmail(string $email): ?UserDto
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);
        return $this->transformToDto($user);
    }

    public function updateUser(UpdateUserDto $updateUserDto, int $id): ?UserDto
    {
        $role_id = $updateUserDto->getRoleId();
        $first_name = $updateUserDto->getFirstName();
        $last_name = $updateUserDto->getLastName();
        $email = $updateUserDto->getEmail();
        $fgcolor = $updateUserDto->getFgcolor();
        $bgcolor = $updateUserDto->getBgcolor();
        $username = $updateUserDto->getUsername();
        $auth0token = $updateUserDto->getAuth0token();

        $userToUpdate = $this->userRepository->find($id);

        if(!$userToUpdate){
            return null;
        }
        if($role_id){
            $role = $this->roleRepository->find($updateUserDto->getRoleId());
            $userToUpdate->setRole($role);
        }
        if($first_name){
            $userToUpdate->setFirstName($first_name);
        }
        if($last_name){
            $userToUpdate->setLastName($last_name);
        }
        if($email){
            $userToUpdate->setEmail($email);
        }
        if($fgcolor){
            $userToUpdate->setFgcolor($fgcolor);
        }
        if($bgcolor){
            $userToUpdate->setBgcolor($bgcolor);
        }
        if($username){
            $userToUpdate->setUsername($username);
        }
        if($auth0token){
            $userToUpdate->setAuth0token($auth0token);
        }

        $this->userRepository->save($userToUpdate, true);

        return $this->transformToDto($userToUpdate);
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

    public function transformToDto($object): UserDto
    {
        return new UserDto(
            $object->getId(),
            $this->roleService->transformToDto($object->getRole()),
            $object->getFirstName(),
            $object->getLastName(),
            $object->getEmail(),
            $object->getFgcolor(),
            $object->getBgcolor(),
            $object->getUsername(),
            $object->getAuth0token()
        );
    }

}