<?php

namespace App\Dto\Outgoing;

class RoundLookupDto
{
 private int $round_lookup_id;
 private int $round_number;

    /**
     * @param int $round_lookup_id
     * @param int $round_number
     */
    public function __construct(int $round_lookup_id, int $round_number)
    {
        $this->round_lookup_id = $round_lookup_id;
        $this->round_number = $round_number;
    }

    /**
     * @return int
     */
    public function getRoundLookupId(): int
    {
        return $this->round_lookup_id;
    }

    /**
     * @param int $round_lookup_id
     */
    public function setRoundLookupId(int $round_lookup_id): void
    {
        $this->round_lookup_id = $round_lookup_id;
    }

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



}