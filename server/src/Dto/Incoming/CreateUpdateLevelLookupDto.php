<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class CreateUpdateLevelLookupDto
{
    #[NotNull]
    #[Type('int')]
    private int $level_number;

    #[NotNull]
    #[Type('int')]
    private int $unit_score;

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