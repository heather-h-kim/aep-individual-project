<?php

namespace App\Dto\Incoming;

class LevelDto
{
    private int $level_number;
    /**
     * @var RoundDto[] $rounds
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
     * @return RoundDto[]
     */
    public function getRounds(): array
    {
        return $this->rounds;
    }

    /**
     * @param RoundDto[] $rounds
     */
    public function setRounds(array $rounds): void
    {
        $this->rounds = $rounds;
    }

}