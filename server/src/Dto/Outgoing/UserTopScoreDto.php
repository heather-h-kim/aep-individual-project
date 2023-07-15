<?php

namespace App\Dto\Outgoing;

class UserTopScoreDto
{
    private int $rank;
    private ?string $userName;
    private ?int $topScore;

    /**
     * @param int $rank
     * @param string|null $userName
     * @param int|null $topScore
     */
    public function __construct(int $rank, ?string $userName, ?int $topScore)
    {
        $this->rank = $rank;
        $this->userName = $userName;
        $this->topScore = $topScore;
    }

    /**
     * @return int
     */
    public function getRank(): int
    {
        return $this->rank;
    }

    /**
     * @param int $rank
     */
    public function setRank(int $rank): void
    {
        $this->rank = $rank;
    }

    /**
     * @return string|null
     */
    public function getUserName(): ?string
    {
        return $this->userName;
    }

    /**
     * @param string|null $userName
     */
    public function setUserName(?string $userName): void
    {
        $this->userName = $userName;
    }

    /**
     * @return int|null
     */
    public function getTopScore(): ?int
    {
        return $this->topScore;
    }

    /**
     * @param int|null $topScore
     */
    public function setTopScore(?int $topScore): void
    {
        $this->topScore = $topScore;
    }



}