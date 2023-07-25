<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\Column(length: 12)]
    private ?string $first_name = null;

    #[ORM\Column(length: 12)]
    private ?string $last_name = null;

    #[ORM\Column(length: 24)]
    private ?string $email = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(name: 'role_id', referencedColumnName: 'role_id')]
    private ?Role $role = null;

    #[ORM\Column(length: 10)]
    private ?string $fgcolor = null;

    #[ORM\Column(length: 10)]
    private ?string $bgcolor = null;

    #[ORM\Column(length: 10)]
    private ?string $username = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $auth0token = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Game::class)]
    #[ORM\JoinColumn(name:'game_id', referencedColumnName: 'game_id' )]
    private Collection $games;

    public function __construct()
    {
        $this->games = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->user_id;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): self
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getFgcolor(): ?string
    {
        return $this->fgcolor;
    }

    public function setFgcolor(?string $fgcolor): self
    {
        $this->fgcolor = $fgcolor;

        return $this;
    }

    public function getBgcolor(): ?string
    {
        return $this->bgcolor;
    }

    public function setBgcolor(?string $bgcolor): self
    {
        $this->bgcolor = $bgcolor;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getAuth0token(): ?string
    {
        return $this->auth0token;
    }

    public function setAuth0token(?string $auth0token): self
    {
        $this->auth0token = $auth0token;

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
            $game->setUser($this);
        }

        return $this;
    }

    public function removeGame(Game $game): self
    {
        if ($this->games->removeElement($game)) {
            // set the owning side to null (unless already changed)
            if ($game->getUser() === $this) {
                $game->setUser(null);
            }
        }

        return $this;
    }

}
