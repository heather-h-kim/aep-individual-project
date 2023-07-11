<?php

namespace App\Entity;

use App\Repository\RoundLookupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoundLookupRepository::class)]
class RoundLookup
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $round_lookup_id = null;

    #[ORM\Column]
    private ?int $round_number = null;

    #[ORM\OneToOne(mappedBy: 'round_lookup_id', cascade: ['persist', 'remove'])]
    private ?Round $round = null;

    public function getId(): ?int
    {
        return $this->round_lookup_id;
    }

    public function getRoundNumber(): ?int
    {
        return $this->round_number;
    }

    public function setRoundNumber(int $round_number): self
    {
        $this->round_number = $round_number;

        return $this;
    }

    public function getRound(): ?Round
    {
        return $this->round;
    }

    public function setRound(Round $round): self
    {
        // set the owning side of the relation if necessary
        if ($round->getRoundLookupId() !== $this) {
            $round->setRoundLookupId($this);
        }

        $this->round = $round;

        return $this;
    }
}
