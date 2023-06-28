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

    public function createUser(CreateUserDto $createUserDto): UserDto | string
    {

        $userWithToken = $this->getUserByToken($createUserDto->getAuth0token());

        if ($userWithToken) {
            return $userWithToken;
        }


        $role = $this->roleRepository->find($createUserDto->getRoleId());

        if (!$role) {
            throw new BadRequestHttpException('Role not found');
        }

        $newUser = new User();

        $firstName = $createUserDto->getFirstName();

        if($firstName){
            $newUser->setFirstName($firstName);
        }
//        $newUser->setFirstName($createUserDto->getFirstName());
        $lastName = $createUserDto->getLastName();
        if($lastName){
            $newUser->setLastName($lastName);
        }
//        $newUser->setLastName($createUserDto->getLastName());
        $newUser->setEmail($createUserDto->getEmail());
        $newUser->setFgcolor($createUserDto->getFgColor());
        $newUser->setBgcolor($createUserDto->getBgColor());
        $newUser->setUsername($createUserDto->getUsername());
        $newUser->setAuth0token($createUserDto->getAuth0token());
        $newUser->setRole($role);
        $this->userRepository->save($newUser, true);

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

    public function getUserByToken(string $token): ?UserDto
    {
        $user = $this->userRepository->findOneBy(['auth0token' => $token]);

        if(!$user) {
            return $this->transformToDto($user);
        }

        return $this->transformToDto($user);
    }

    public function updateUser(UpdateUserDto $updateUserDto): UserDto | string
    {
        $user_id = $updateUserDto->getUserId();
        $role_id = $updateUserDto->getRoleId();
        $first_name = $updateUserDto->getFirstName();
        $last_name = $updateUserDto->getLastName();
        $email = $updateUserDto->getEmail();
        $fgcolor = $updateUserDto->getFgcolor();
        $bgcolor = $updateUserDto->getBgcolor();
        $username = $updateUserDto->getUsername();
        $auth0token = $updateUserDto->getAuth0token();

        $userToUpdate = $this->userRepository->find($user_id);

        if(!$userToUpdate){
            return 'No user to update';
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
            $user = $this->userRepository->findBy(['email' => $email]);
            if($user) {
                return 'User with the same email exists. Please use a different email';
            }
            $userToUpdate->setEmail($email);
        }
        if($fgcolor){
            $userToUpdate->setFgcolor($fgcolor);
        }
        if($bgcolor){
            $userToUpdate->setBgcolor($bgcolor);
        }
        if($username){
            $userByUsername = $this->userRepository->findOneBy(['username' => $username]);

            if($userByUsername !== null && $userByUsername != $userToUpdate) {
                return 'User with the same username exists. Please use a different username';
            }

            if($userByUsername === null){
                $userToUpdate->setUsername($username);
            }

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