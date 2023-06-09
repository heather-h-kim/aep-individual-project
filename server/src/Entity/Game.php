<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $game_id = null;

    #[ORM\ManyToOne(inversedBy: 'Games')]
    #[ORM\JoinColumn(name: 'season_id', referencedColumnName: 'season_id', nullable: false)]
    private ?Season $season_id = null;

    #[ORM\ManyToOne(inversedBy: 'Games')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id', nullable: false)]
    private ?User $user_id = null;

    #[ORM\OneToMany(mappedBy: 'game_id', targetEntity: Level::class)]
    #[ORM\JoinColumn(name:'level_id', referencedColumnName: 'level_id')]
    private Collection $Levels;

    public function __construct()
    {
        $this->Levels = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->game_id;
    }

    public function getSeasonId(): ?Season
    {
        return $this->season_id;
    }

    public function setSeasonId(?Season $season_id): self
    {
        $this->season_id = $season_id;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * @return Collection<int, Level>
     */
    public function getLevels(): Collection
    {
        return $this->Levels;
    }

    public function addLevel(Level $level): self
    {
        if (!$this->Levels->contains($level)) {
            $this->Levels->add($level);
            $level->setGameId($this);
        }

        return $this;
    }

    public function removeLevel(Level $level): self
    {
        if ($this->Levels->removeElement($level)) {
            // set the owning side to null (unless already changed)
            if ($level->getGameId() === $this) {
                $level->setGameId(null);
            }
        }

        return $this;
    }
}
