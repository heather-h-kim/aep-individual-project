<?php

namespace App\Dto\Outgoing;

class GameDto
{
    private int $game_id;
    private ?SeasonDto $season;
    private ?UserDto $user;

    /**
     * @param int $game_id
     * @param SeasonDto|null $season
     * @param UserDto|null $user
     */
    public function __construct(int $game_id, ?SeasonDto $season, ?UserDto $user)
    {
        $this->game_id = $game_id;
        $this->season = $season;
        $this->user = $user;
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
    public function getSeason(): ?SeasonDto
    {
        return $this->season;
    }

    /**
     * @param SeasonDto|null $season
     */
    public function setSeason(?SeasonDto $season): void
    {
        $this->season = $season;
    }

    /**
     * @return UserDto|null
     */
    public function getUser(): ?UserDto
    {
        return $this->user;
    }

    /**
     * @param UserDto|null $user
     */
    public function setUser(?UserDto $user): void
    {
        $this->user = $user;
    }



}