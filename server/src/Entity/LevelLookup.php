<?php

namespace App\Entity;

use App\Repository\LevelLookupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LevelLookupRepository::class)]
class LevelLookup
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $level_lookup_id = null;

    #[ORM\Column]
    private ?int $level_number = null;

    #[ORM\Column]
    private ?int $unit_score = null;

    #[ORM\OneToOne(mappedBy: 'level_lookup_id', cascade: ['persist', 'remove'])]
    private ?Level $level = null;

    public function getId(): ?int
    {
        return $this->level_lookup_id;
    }

    public function getLevelNumber(): ?int
    {
        return $this->level_number;
    }

    public function setLevelNumber(int $level_number): self
    {
        $this->level_number = $level_number;

        return $this;
    }

    public function getUnitScore(): ?int
    {
        return $this->unit_score;
    }

    public function setUnitScore(int $unit_score): self
    {
        $this->unit_score = $unit_score;

        return $this;
    }

    public function getLevel(): ?Level
    {
        return $this->level;
    }

    public function setLevel(Level $level): self
    {
        // set the owning side of the relation if necessary
        if ($level->getLevelLookupId() !== $this) {
            $level->setLevelLookupId($this);
        }

        $this->level = $level;

        return $this;
    }
}
