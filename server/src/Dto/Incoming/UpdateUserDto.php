<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\Type;

class UpdateUserDto
{
    private ?int $role_id = null;

    private ?string $first_name = null;

    private ?string $last_name = null;

    private ?string $email = null;

    private ?string $fgcolor = null;

    private ?string $bgcolor = null;

    private ?string $username = null;

    private ?string $auth0token = null;

    /**
     * @return int|null
     */
    public function getRoleId(): ?int
    {
        return $this->role_id;
    }

    /**
     * @param int|null $role_id
     */
    public function setRoleId(?int $role_id): void
    {
        $this->role_id = $role_id;
    }

    /**
     * @return string|null
     */
    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    /**
     * @param string|null $first_name
     */
    public function setFirstName(?string $first_name): void
    {
        $this->first_name = $first_name;
    }

    /**
     * @return string|null
     */
    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    /**
     * @param string|null $last_name
     */
    public function setLastName(?string $last_name): void
    {
        $this->last_name = $last_name;
    }

    /**
     * @return string|null
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string|null $email
     */
    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string|null
     */
    public function getFgcolor(): ?string
    {
        return $this->fgcolor;
    }

    /**
     * @param string|null $fgcolor
     */
    public function setFgcolor(?string $fgcolor): void
    {
        $this->fgcolor = $fgcolor;
    }

    /**
     * @return string|null
     */
    public function getBgcolor(): ?string
    {
        return $this->bgcolor;
    }

    /**
     * @param string|null $bgcolor
     */
    public function setBgcolor(?string $bgcolor): void
    {
        $this->bgcolor = $bgcolor;
    }

    /**
     * @return string|null
     */
    public function getUsername(): ?string
    {
        return $this->username;
    }

    /**
     * @param string|null $username
     */
    public function setUsername(?string $username): void
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