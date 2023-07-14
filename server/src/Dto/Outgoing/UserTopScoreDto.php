<?php

namespace App\Dto\Outgoing;

class UserTopScoreDto
{
    private ?string $userName;
    private ?int $topScore;

    /**
     * @param string|null $userName
     * @param int|null $topScore
     */
    public function __construct(?string $userName, ?int $topScore)
    {
        $this->userName = $userName;
        $this->topScore = $topScore;
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