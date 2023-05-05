<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class UserService
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;
    private LoggerInterface $logger;

    /**
     * @param EntityManagerInterface $entityManager
     * @param UserRepository $userRepository
     * @param LoggerInterface $logger
     */

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->logger = $logger;
    }


}