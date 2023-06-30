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

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $start_date = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $end_date = null;

    #[ORM\OneToMany(mappedBy: 'season_id', targetEntity: Game::class)]
    #[ORM\JoinColumn(name: 'game_id', referencedColumnName: 'game_id')]
    private Collection $Games;

    public function __construct()
    {
        $this->Games = new ArrayCollection();
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
        return $this->Games;
    }

    public function addGame(Game $game): self
    {
        if (!$this->Games->contains($game)) {
            $this->Games->add($game);
            $game->setSeasonId($this);
        }

        return $this;
    }

    public function removeGame(Game $game): self
    {
        if ($this->Games->removeElement($game)) {
            // set the owning side to null (unless already changed)
            if ($game->getSeasonId() === $this) {
                $game->setSeasonId(null);
            }
        }

        return $this;
    }
}
