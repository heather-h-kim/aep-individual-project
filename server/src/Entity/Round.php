<?php

namespace App\Entity;

use App\Repository\RoundRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoundRepository::class)]
class Round
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $round_id = null;

    #[ORM\Column]
    private ?float $number_shown = null;

    #[ORM\Column]
    private ?float $number_entered = null;

    #[ORM\ManyToOne(inversedBy: 'rounds')]
    #[ORM\JoinColumn(name: 'level_id', referencedColumnName: 'level_id', nullable: false)]
    private ?Level $level = null;

    #[ORM\OneToOne(inversedBy: 'round', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name:'round_lookup_id', referencedColumnName: 'round_lookup_id', nullable: false, unique: false)]
    private ?RoundLookup $round_lookup_id = null;

    public function getId(): ?int
    {
        return $this->round_id;
    }

    public function getNumberShown(): ?int
    {
        return $this->number_shown;
    }

    public function setNumberShown(int $number_shown): self
    {
        $this->number_shown = $number_shown;

        return $this;
    }

    public function getNumberEntered(): ?int
    {
        return $this->number_entered;
    }

    public function setNumberEntered(int $number_entered): self
    {
        $this->number_entered = $number_entered;

        return $this;
    }

    public function getLevel(): ?Level
    {
        return $this->level;
    }

    public function setLevel(?Level $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getRoundLookupId(): ?RoundLookup
    {
        return $this->round_lookup_id;
    }

    public function setRoundLookupId(RoundLookup $round_lookup_id): self
    {
        $this->round_lookup_id = $round_lookup_id;

        return $this;
    }
}
