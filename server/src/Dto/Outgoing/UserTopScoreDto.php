<?php

namespace App\Dto\Outgoing;

class UserTopScoreDto
{
    private ?int $user_id;
    private ?int $top_score;

    /**
     * @param int|null $user_id
     * @param int|null $score
     */
    public function __construct(?int $user_id, ?int $top_score)
    {
        $this->user_id = $user_id;
        $this->top_score = $top_score;
    }

    /**
     * @return int|null
     */
    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    /**
     * @param int|null $user_id
     */
    public function setUserId(?int $user_id): void
    {
        $this->user_id = $user_id;
    }

    /**
     * @return int|null
     */
    public function getScore(): ?int
    {
        return $this->top_score;
    }

    /**
     * @param int|null $top_score
     */
    public function setScore(?int $top_score): void
    {
        $this->top_score = $top_score;
    }




}