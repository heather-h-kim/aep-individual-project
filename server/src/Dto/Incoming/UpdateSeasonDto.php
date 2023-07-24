<?php

namespace App\Dto\Incoming;



use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class UpdateSeasonDto
{
    #[NotNull]
    #[Type('int')]
    private int $season_id;
    private ?int $start_date = null;
    private ?int $end_date = null;
    private ?int $prev_end_date = null;
    private ?int $next_start_date = null;

    /**
     * @param int $season_id
     * @param int|null $start_date
     * @param int|null $end_date
     * @param int|null $prev_end_date
     * @param int|null $next_start_date
     */
    public function __construct(int $season_id, ?int $start_date, ?int $end_date, ?int $prev_end_date, ?int $next_start_date)
    {
        $this->season_id = $season_id;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->prev_end_date = $prev_end_date;
        $this->next_start_date = $next_start_date;
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
     * @return int|null
     */
    public function getStartDate(): ?int
    {
        return $this->start_date;
    }

    /**
     * @param int|null $start_date
     */
    public function setStartDate(?int $start_date): void
    {
        $this->start_date = $start_date;
    }

    /**
     * @return int|null
     */
    public function getEndDate(): ?int
    {
        return $this->end_date;
    }

    /**
     * @param int|null $end_date
     */
    public function setEndDate(?int $end_date): void
    {
        $this->end_date = $end_date;
    }

    /**
     * @return int|null
     */
    public function getPrevEndDate(): ?int
    {
        return $this->prev_end_date;
    }

    /**
     * @param int|null $prev_end_date
     */
    public function setPrevEndDate(?int $prev_end_date): void
    {
        $this->prev_end_date = $prev_end_date;
    }

    /**
     * @return int|null
     */
    public function getNextStartDate(): ?int
    {
        return $this->next_start_date;
    }

    /**
     * @param int|null $next_start_date
     */
    public function setNextStartDate(?int $next_start_date): void
    {
        $this->next_start_date = $next_start_date;
    }


}