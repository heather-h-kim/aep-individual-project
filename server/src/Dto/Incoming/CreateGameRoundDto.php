<?php

namespace App\Dto\Incoming;

class CreateGameRoundDto
{

    private int $played_at;
    private int $user_id;
    /**
     * @var LevelDto[] $levels_rounds
     */
    private array $levels_rounds;

    /**
     * @return int
     */
    public function getPlayedAt(): int
    {
        return $this->played_at;
    }

    /**
     * @param int $played_at
     */
    public function setPlayedAt(int $played_at): void
    {
        $this->played_at = $played_at;
    }

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
     * @return LevelDto[]
     */
    public function getLevelsRounds(): array
    {
        return $this->levels_rounds;
    }

    /**
     * @param LevelDto[] $levels_rounds
     */
    public function setLevelsRounds(array $levels_rounds): void
    {
        $this->levels_rounds = $levels_rounds;
    }



}