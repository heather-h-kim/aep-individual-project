<?php

namespace App\Dto\Outgoing;

use App\Entity\Season;
use App\Entity\User;

class GameDto
{
    private int $game_id;
    private Season $season_id;
    private User $user_id;

    /**
     * @param int $game_id
     */
    public function __construct(int $game_id, Season $season_id, User $user_id)
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
     * @return Season
     */
    public function getSeasonId(): Season
    {
        return $this->season_id;
    }

    /**
     * @param Season $season_id
     */
    public function setSeasonId(Season $season_id): void
    {
        $this->season_id = $season_id;
    }

    /**
     * @return User
     */
    public function getUserId(): User
    {
        return $this->user_id;
    }

    /**
     * @param User $user_id
     */
    public function setUserId(User $user_id): void
    {
        $this->user_id = $user_id;
    }


}