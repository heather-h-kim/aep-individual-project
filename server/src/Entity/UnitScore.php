<?php

namespace App\Entity;

use App\Repository\UnitScoreRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UnitScoreRepository::class)]
class UnitScore
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $unit_score_id = null;

    #[ORM\Column(length: 30)]
    private ?string $unit_score_name = null;

    #[ORM\Column]
    private ?int $score = null;

    #[ORM\OneToOne(mappedBy: 'unit_score_id', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name: 'level_id', referencedColumnName: 'level_id')]
    private ?Level $Level = null;

    public function getId(): ?int
    {
        return $this->unit_score_id;
    }

    public function getUnitScoreName(): ?string
    {
        return $this->unit_score_name;
    }

    public function setUnitScoreName(string $unit_score_name): self
    {
        $this->unit_score_name = $unit_score_name;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getLevel(): ?Level
    {
        return $this->Level;
    }

    public function setLevel(?Level $Level): self
    {
        // unset the owning side of the relation if necessary
        if ($Level === null && $this->Level !== null) {
            $this->Level->setUnitScoreId(null);
        }

        // set the owning side of the relation if necessary
        if ($Level !== null && $Level->getUnitScoreId() !== $this) {
            $Level->setUnitScoreId($this);
        }

        $this->Level = $Level;

        return $this;
    }
}
