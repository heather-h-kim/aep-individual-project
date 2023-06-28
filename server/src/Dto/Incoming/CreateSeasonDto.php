<?php

namespace App\Dto\Incoming;


class CreateSeasonDto
{
    private int $start_date;
    private int $end_date;

    /**
     * @return int
     */
    public function getStartDate(): int
    {
        return $this->start_date;
    }

    /**
     * @param int $start_date
     */
    public function setStartDate(int $start_date): void
    {
        $this->start_date = $start_date;
    }

    /**
     * @return int
     */
    public function getEndDate(): int
    {
        return $this->end_date;
    }

    /**
     * @param int $end_date
     */
    public function setEndDate(int $end_date): void
    {
        $this->end_date = $end_date;
    }






}