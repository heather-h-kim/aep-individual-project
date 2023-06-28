<?php

namespace App\Dto\Incoming;

class RoundDto
{
    private int $round_number;
    private int $number_shown;
    private int $number_answered;

    /**
     * @return int
     */
    public function getRoundNo(): int
    {
        return $this->roundNo;
    }

    /**
     * @param int $roundNo
     */
    public function setRoundNo(int $roundNo): void
    {
        $this->roundNo = $roundNo;
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
    public function getNumberAnswered(): int
    {
        return $this->number_answered;
    }

    /**
     * @param int $number_answered
     */
    public function setNumberAnswered(int $number_answered): void
    {
        $this->number_answered = $number_answered;
    }
}