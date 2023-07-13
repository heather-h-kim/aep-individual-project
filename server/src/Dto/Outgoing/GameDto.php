<?php

namespace App\Dto\Outgoing;

use App\Entity\Season;
use App\Entity\User;

class GameDto
{
    private int $game_id;
    private ?SeasonDto $season_id;
    private ?UserDto $user_id;

    /**
     * @param int $game_id
     */
    public function __construct(int $game_id, ?SeasonDto $season_id, ?UserDto $user_id)
    {
        $this->game_id = $game_id;
        $this->season_id = $season_id;
        $this->user_id = $user_id;
    }

    /**
     * @return int
     */
    public function getGameId(): int
    {
        return $this->game_id;
    }

    /**
     * @param int $game_id
     */
    public function setGameId(int $game_id): void
    {
        $this->game_id = $game_id;
    }

    /**
     * @return SeasonDto|null
     */
    public function getSeasonId(): ?SeasonDto
    {
        return $this->season_id;
    }

    /**
     * @param SeasonDto|null $season_id
     */
    public function setSeasonId(?SeasonDto $season_id): void
    {
        $this->season_id = $season_id;
    }

    /**
     * @return UserDto|null
     */
    public function getUserId(): ?UserDto
    {
        return $this->user_id;
    }

    /**
     * @param UserDto|null $user_id
     */
    public function setUserId(?UserDto $user_id): void
    {
        $this->user_id = $user_id;
    }



}