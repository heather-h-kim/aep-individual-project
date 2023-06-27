<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;

class CreateRoundLookupDto
{
    #[NotNULL]
 private int $round_number;

    public function __construct(int $round_number) {
        $this->round_number = $round_number;
    }

    public function getRoundNumber(): int {
        return $this->round_number;
    }
}