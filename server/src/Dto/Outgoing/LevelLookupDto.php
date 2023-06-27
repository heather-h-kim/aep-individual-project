<?php

namespace App\Dto\Outgoing;

class LevelLookupDto
{
 private int $level_lookup_id;
 private int $level_number;
 private int $unit_score;


    /**
     * @param int $level_lookup_id
     * @param int $level_number
     * @param int $unit_score
     */
    public function __construct(int $level_lookup_id, int $level_number, int $unit_score)
    {
        $this->level_lookup_id = $level_lookup_id;
        $this->level_number = $level_number;
        $this->unit_score = $unit_score;
    }


    /**
     * @return int
     */
    public function getLevelLookupId(): int
    {
        return $this->level_lookup_id;
    }

    /**
     * @param int $level_lookup_id
     */
    public function setLevelLookupId(int $level_lookup_id): void
    {
        $this->level_lookup_id = $level_lookup_id;
    }

    /**
     * @return int
     */
    public function getLevelNumber(): int
    {
        return $this->level_number;
    }

    /**
     * @param int $level_number
     */
    public function setLevelNumber(int $level_number): void
    {
        $this->level_number = $level_number;
    }

    /**
     * @return int
     */
    public function getUnitScore(): int
    {
        return $this->unit_score;
    }

    /**
     * @param int $unit_score
     */
    public function setUnitScore(int $unit_score): void
    {
        $this->unit_score = $unit_score;
    }


}