<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class CreateGameLevelRoundDto
{
//    #[NotNull]
//    #[Type('int')]
//    private int $played_at;
    #[NotNull]
    #[Type('int')]
    private int $user_id;
    /**
     * @var CreateLevelDto[] $levels_rounds
     */
    private array $levels_rounds;


//    /**
//     * @return int
//     */
//    public function getPlayedAt(): int
//    {
//        return $this->played_at;
//    }
//
//    /**
//     * @param int $played_at
//     */
//    public function setPlayedAt(int $played_at): void
//    {
//        $this->played_at = $played_at;
//    }

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->user_id;
    }

    /**
     * @param int $user_id
     */
    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    /**
     * @return CreateLevelDto[]
     */
    public function getLevelsRounds(): array
    {
        return $this->levels_rounds;
    }

    /**
     * @param CreateLevelDto[] $levels_rounds
     */
    public function setLevelsRounds(array $levels_rounds): void
    {
        $this->levels_rounds = $levels_rounds;
    }



}