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
    private ?int $is_correct = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $played_at = null;

    #[ORM\Column]
    private ?int $number_shown = null;

    #[ORM\Column]
    private ?int $number_entered = null;

    #[ORM\ManyToOne(inversedBy: 'Rounds')]
    #[ORM\JoinColumn(name: 'level_id', referencedColumnName: 'level_id', nullable: false)]
    private ?Level $level_id = null;

    #[ORM\OneToOne(inversedBy: 'Round', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name:'round_lookup_id', referencedColumnName: 'round_lookup_id', nullable: false)]
    private ?RoundLookup $round_lookup_id = null;

    public function getId(): ?int
    {
        return $this->round_id;
    }

    public function getIsCorrect(): ?int
    {
        return $this->is_correct;
    }

    public function setIsCorrect(int $is_correct): self
    {
        $this->is_correct = $is_correct;

        return $this;
    }

    public function getPlayedAt(): ?\DateTimeInterface
    {
        return $this->played_at;
    }

    public function setPlayedAt(\DateTimeInterface $played_at): self
    {
        $this->played_at = $played_at;

        return $this;
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

    public function getLevelId(): ?Level
    {
        return $this->level_id;
    }

    public function setLevelId(?Level $level_id): self
    {
        $this->level_id = $level_id;

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
