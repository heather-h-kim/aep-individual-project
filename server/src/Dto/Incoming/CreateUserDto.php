<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class CreateUserDto
{
    #[NotNull]
    #[Type('int')]
    private int $role_id = 2;

    #[NotNull]
    #[Type('string')]
    private string $first_name;

    #[NotNull]
    #[Type('string')]
    private string $last_name;

    #[NotNull]
    #[Type('string')]
    private string $email;

    #[Type('string')]
    private ?string $fgcolor = null;

    #[Type('string')]
    private ?string $bgcolor = null;

    #[NotNull]
    #[Type('string')]
    private string $username;

    #[NotNull]
    #[Type('string')]
    private ?string $auth0token;

    /**
     * @return int
     */
    public function getRoleId(): int
    {
        return $this->role_id;
    }

    /**
     * @param int $role_id
     */
    public function setRoleId(int $role_id): void
    {
        $this->role_id = $role_id;
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->first_name;
    }

    /**
     * @param string $first_name
     */
    public function setFirstName(string $first_name): void
    {
        $this->first_name = $first_name;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->last_name;
    }

    /**
     * @param string $last_name
     */
    public function setLastName(string $last_name): void
    {
        $this->last_name = $last_name;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getFgcolor(): ?string
    {
        return $this->fgcolor;
    }

    /**
     * @param string $fgcolor
     */
    public function setFgcolor(string $fgcolor): void
    {
        $this->fgcolor = $fgcolor;
    }

    /**
     * @return string
     */
    public function getBgcolor(): ?string
    {
        return $this->bgcolor;
    }

    /**
     * @param string $bgcolor
     */
    public function setBgcolor(string $bgcolor): void
    {
        $this->bgcolor = $bgcolor;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return string|null
     */
    public function getAuth0token(): ?string
    {
        return $this->auth0token;
    }

    /**
     * @param string|null $auth0token
     */
    public function setAuth0token(?string $auth0token): void
    {
        $this->auth0token = $auth0token;
    }







}