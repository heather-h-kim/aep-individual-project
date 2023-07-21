<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $game_id = null;

    #[ORM\ManyToOne(inversedBy: 'games')]
    #[ORM\JoinColumn(name: 'season_id', referencedColumnName: 'season_id', nullable: true)]
    private ?Season $season = null;

    #[ORM\ManyToOne(inversedBy: 'games')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id', nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'game', targetEntity: Level::class)]
    #[ORM\JoinColumn(name:'level_id', referencedColumnName: 'level_id')]
    private Collection $levels;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $played_at = null;



    public function __construct()
    {
        $this->levels = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->game_id;
    }


    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Level>
     */
    public function getLevels(): Collection
    {
        return $this->levels;
    }

    public function addLevel(Level $level): self
    {
        if (!$this->levels->contains($level)) {
            $this->levels->add($level);
            $level->setGame($this);
        }

        return $this;
    }

    public function removeLevel(Level $level): self
    {
        if ($this->levels->removeElement($level)) {
            // set the owning side to null (unless already changed)
            if ($level->getGame() === $this) {
                $level->setGame(null);
            }
        }

        return $this;
    }

    public function getPlayedAt(): ?\DateTime
    {
        return $this->played_at;
    }

    public function setPlayedAt(\DateTime $played_at): self
    {
        $this->played_at = $played_at;

        return $this;
    }

    public function getSeason(): ?Season
    {
        return $this->season;
    }

    public function setSeason(?Season $season): self
    {
        $this->season = $season;

        return $this;
    }


}
