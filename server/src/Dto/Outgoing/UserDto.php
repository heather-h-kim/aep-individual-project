<?php

namespace App\Dto\Outgoing;

class UserDto
{
    private int $user_id;
    private ?RoleDto $roll;
    private string $first_name;
    private string $last_name;
    private string $email;
    private ?string $fgcolor;
    private ?string $bgcolor;
    private string $username;
    private ?string $auth0token;

    /**
     * @param int $user_id
     * @param RoleDto|null $roll
     * @param string $first_name
     * @param string $last_name
     * @param string $email
     * @param string|null $fgcolor
     * @param string|null $bgcolor
     * @param string $username
     * @param string|null $auth0token
     */
    public function __construct(int $user_id, ?RoleDto $roll, string $first_name, string $last_name, string $email, ?string $fgcolor, ?string $bgcolor, string $username, ?string $auth0token)
    {
        $this->user_id = $user_id;
        $this->roll = $roll;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->fgcolor = $fgcolor;
        $this->bgcolor = $bgcolor;
        $this->username = $username;
        $this->auth0token = $auth0token;
    }

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->user_id;
    }

    /**
     * @param int $user_id
     */
    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    /**
     * @return RoleDto|null
     */
    public function getRoll(): ?RoleDto
    {
        return $this->roll;
    }

    /**
     * @param RoleDto|null $roll
     */
    public function setRoll(?RoleDto $roll): void
    {
        $this->roll = $roll;
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