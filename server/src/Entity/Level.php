<?php

namespace App\Entity;

use App\Repository\LevelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LevelRepository::class)]
class Level
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $level_id = null;

    #[ORM\Column]
    private ?int $level_number = null;

    #[ORM\ManyToOne(inversedBy: 'Levels')]
    #[ORM\JoinColumn(name: 'game_id', referencedColumnName: 'game_id', nullable: false)]
    private ?Game $game_id = null;

    #[ORM\OneToOne(inversedBy: 'Level', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name: 'unit_score_id', referencedColumnName: 'unit_score_id')]
    private ?UnitScore $unit_score_id = null;

    #[ORM\OneToMany(mappedBy: 'level_id', targetEntity: Round::class)]
    #[ORM\JoinColumn(name:'round_id', referencedColumnName: 'round_id')]
    private Collection $Rounds;

    public function __construct()
    {
        $this->Rounds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->level_id;
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

    public function getGameId(): ?Game
    {
        return $this->game_id;
    }

    public function setGameId(?Game $game_id): self
    {
        $this->game_id = $game_id;

        return $this;
    }

    public function getUnitScoreId(): ?UnitScore
    {
        return $this->unit_score_id;
    }

    public function setUnitScoreId(?UnitScore $unit_score_id): self
    {
        $this->unit_score_id = $unit_score_id;

        return $this;
    }

    /**
     * @return Collection<int, Round>
     */
    public function getRounds(): Collection
    {
        return $this->Rounds;
    }

    public function addRound(Round $round): self
    {
        if (!$this->Rounds->contains($round)) {
            $this->Rounds->add($round);
            $round->setLevelId($this);
        }

        return $this;
    }

    public function removeRound(Round $round): self
    {
        if ($this->Rounds->removeElement($round)) {
            // set the owning side to null (unless already changed)
            if ($round->getLevelId() === $this) {
                $round->setLevelId(null);
            }
        }

        return $this;
    }
}
