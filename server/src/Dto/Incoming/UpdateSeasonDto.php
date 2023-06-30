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




}