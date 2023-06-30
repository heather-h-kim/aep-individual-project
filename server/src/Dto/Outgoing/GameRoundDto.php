<?php

namespace App\Dto\Outgoing;

class GameRoundDto
{
    private int $user_id;
    private int $season_id;
    private int $game_id;
    private int $score;
    private \DateTime $played_at;

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
     * @return int
     */
    public function getSeasonId(): int
    {
        return $this->season_id;
    }

    /**
     * @param int $season_id
     */
    public function setSeasonId(int $season_id): void
    {
        $this->season_id = $season_id;
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
     * @return int
     */
    public function getScore(): int
    {
        return $this->score;
    }

    /**
     * @param int $score
     */
    public function setScore(int $score): void
    {
        $this->score = $score;
    }

    /**
     * @return \DateTime
     */
    public function getPlayedAt(): \DateTime
    {
        return $this->played_at;
    }

    /**
     * @param \DateTime $played_at
     */
    public function setPlayedAt(\DateTime $played_at): void
    {
        $this->played_at = $played_at;
    }

}