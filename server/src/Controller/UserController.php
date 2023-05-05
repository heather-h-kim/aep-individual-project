<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Serialization\SerializationService;
use App\Repository\UserRepository;
use App\Repository\RoleRepository;
use App\Entity\User;
use App\Entity\Role;

class UserController extends ApiController
{
    private SerializationService $serializationService;

    #[Route('api/user', methods: ('POST'))]
    public function createUser(Request $request, UserRepository $user): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
//        $first_name = $data['first_name'] ?? null;
//        $last_name = $data['last_name'] ?? null;
//        $email = $data['email'] ?? null;
//        $fgcolor = $data['fgcolor'] ?? null;
//        $bgcolor = $data['bgcolor'] ?? null;
//
//        $role_id = $data['role_id'] ?? null;
//
//        $roleToUse = $this->json($role->findOneBy(['role_id'=>$id], null));
//
//
//        $testUser = new User();
//        $testUser->setFirstName($first_name);
//        $testUser->setLastName($last_name);
//        $testUser->setEmail($email);
//        $testUser->setFgcolor($fgcolor);
//        $testUser->setBgcolor($bgcolor);
//        $testUser->setRole($roleToUse);
//
//        $user->save($testUser, true);

        return new Response($data);
    }
}
