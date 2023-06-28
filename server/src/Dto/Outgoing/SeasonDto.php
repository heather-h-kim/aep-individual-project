<?php

namespace App\Dto\Outgoing;

class SeasonDto
{
 private int $season_id;
 private \DateTime $start_date;
 private \DateTime $end_date;

    /**
     * @param int $season_id
     * @param \DateTime $start_date
     * @param \DateTime $end_date
     */
    public function __construct(int $season_id, \DateTime $start_date, \DateTime $end_date)
    {
        $this->season_id = $season_id;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
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
     * @return \DateTime
     */
    public function getStartDate(): \DateTime
    {
        return $this->start_date;
    }

    /**
     * @param \DateTime $start_date
     */
    public function setStartDate(\DateTime $start_date): void
    {
        $this->start_date = $start_date;
    }

    /**
     * @return \DateTime
     */
    public function getEndDate(): \DateTime
    {
        return $this->end_date;
    }

    /**
     * @param \DateTime $end_date
     */
    public function setEndDate(\DateTime $end_date): void
    {
        $this->end_date = $end_date;
    }



}