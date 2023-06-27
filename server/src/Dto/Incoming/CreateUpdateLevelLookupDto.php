<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;

class CreateUpdateLevelLookupDto
{
    #[NotNull]
    private int $level_number;

    #[NotNull]
    private int $unit_score;

    public function __construct(int $level_number, int $unit_score){
        $this->level_number = $level_number;
        $this->unit_score = $unit_score;
    }

    public function getLevelNumber(): int {
        return $this->level_number;
}

public function getUnitScore(): int {
        return $this->unit_score;
}

}