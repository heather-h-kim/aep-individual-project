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


    #[ORM\ManyToOne(inversedBy: 'Levels')]
    #[ORM\JoinColumn(name: 'game_id', referencedColumnName: 'game_id', nullable: false)]
    private ?Game $game_id = null;


    #[ORM\OneToMany(mappedBy: 'level_id', targetEntity: Round::class)]
    #[ORM\JoinColumn(name:'round_id', referencedColumnName: 'round_id')]
    private Collection $Rounds;

    #[ORM\OneToOne(inversedBy: 'level', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name: 'level_lookup_id', referencedColumnName: 'level_lookup_id', nullable: false)]
    private ?LevelLookup $level_lookup_id = null;

    public function __construct()
    {
        $this->Rounds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->level_id;
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

    public function getLevelLookupId(): ?LevelLookup
    {
        return $this->level_lookup_id;
    }

    public function setLevelLookupId(LevelLookup $level_lookup_id): self
    {
        $this->level_lookup_id = $level_lookup_id;

        return $this;
    }
}
