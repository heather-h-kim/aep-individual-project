<?php

namespace App\Entity;

use App\Repository\SeasonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SeasonRepository::class)]
class Season
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $season_id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $start_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $end_date = null;

    #[ORM\OneToMany(mappedBy: 'season', targetEntity: Game::class)]
    #[ORM\JoinColumn(name:'game_id', referencedColumnName: 'game_id')]
    private Collection $games;


    public function __construct()
    {
        $this->games = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->season_id;
    }

    public function getStartDate(): ?\DateTime
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTime $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTime $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    /**
     * @return Collection<int, Game>
     */
    public function getGames(): Collection
    {
        return $this->games;
    }

    public function addGame(Game $game): self
    {
        if (!$this->games->contains($game)) {
            $this->games->add($game);
            $game->setSeason($this);
        }

        return $this;
    }

    public function removeGame(Game $game): self
    {
        if ($this->games->removeElement($game)) {
            // set the owning side to null (unless already changed)
            if ($game->getSeason() === $this) {
                $game->setSeason(null);
            }
        }

        return $this;
    }


}
