<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class CreateLevelDto
{
    #[NotNull]
    #[Type('int')]
    private int $level_number;

    #[NotNull]
    #[Type('array')]
    /**
     * @var CreateRoundDto[] $rounds
     */
    private array $rounds;

    /**
     * @return int
     */
    public function getLevelNumber(): int
    {
        return $this->level_number;
    }

    /**
     * @param int $level_number
     */
    public function setLevelNumber(int $level_number): void
    {
        $this->level_number = $level_number;
    }

    /**
     * @return CreateRoundDto[]
     */
    public function getRounds(): array
    {
        return $this->rounds;
    }

    /**
     * @param CreateRoundDto[] $rounds
     */
    public function setRounds(array $rounds): void
    {
        $this->rounds = $rounds;
    }

}