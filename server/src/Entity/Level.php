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


    #[ORM\ManyToOne(inversedBy: 'levels')]
    #[ORM\JoinColumn(name: 'game_id', referencedColumnName: 'game_id')]
    private ?Game $game = null;


    #[ORM\OneToMany(mappedBy: 'level', targetEntity: Round::class)]
    #[ORM\JoinColumn(name:'round_id', referencedColumnName: 'round_id')]
    private Collection $rounds;

    #[ORM\OneToOne(inversedBy: 'level', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name: 'level_lookup_id', referencedColumnName: 'level_lookup_id', nullable: false)]
    private ?LevelLookup $level_lookup_id = null;

    public function __construct()
    {
        $this->rounds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->level_id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }



    /**
     * @return Collection<int, Round>
     */
    public function getRounds(): Collection
    {
        return $this->rounds;
    }

    public function addRound(Round $round): self
    {
        if (!$this->rounds->contains($round)) {
            $this->rounds->add($round);
            $round->setLevel($this);
        }

        return $this;
    }

    public function removeRound(Round $round): self
    {
        if ($this->rounds->removeElement($round)) {
            // set the owning side to null (unless already changed)
            if ($round->getLevel() === $this) {
                $round->setLevel(null);
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
