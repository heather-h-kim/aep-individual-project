<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class CreateRoundLookupDto
{
    #[NotNULL]
    #[Type('int')]
    private int $round_number;

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