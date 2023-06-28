<?php

namespace App\Dto\Incoming;

class RoundDto
{
    private int $round_number;
    private int $number_shown;
    private int $number_entered;

    /**
     * @return int
     */
    public function getRoundNumber(): int
    {
        return $this->round_number;
    }

    /**
     * @param int $round_number
     */
    public function setRoundNumber(int $round_number): void
    {
        $this->round_number = $round_number;
    }

    /**
     * @return int
     */
    public function getNumberShown(): int
    {
        return $this->number_shown;
    }

    /**
     * @param int $number_shown
     */
    public function setNumberShown(int $number_shown): void
    {
        $this->number_shown = $number_shown;
    }

    /**
     * @return int
     */
    public function getNumberEntered(): int
    {
        return $this->number_entered;
    }

    /**
     * @param int $number_entered
     */
    public function setNumberEntered(int $number_entered): void
    {
        $this->number_entered = $number_entered;
    }

}