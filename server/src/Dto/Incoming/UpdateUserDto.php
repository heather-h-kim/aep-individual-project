<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\Type;

class UpdateUserDto
{
    private ?string $first_name;

    private ?string $last_name;

    private ?string $email;

    private ?string $fgcolor;

    private ?string $bgcolor;

    private ?int $role_id;

    public function __construct(string $first_name = null , string $last_name = null, string $email = null, string $fgcolor = null, string $bgcolor = null, int $role_id = null )
    {
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->fgcolor = $fgcolor;
        $this->bgcolor = $bgcolor;
        $this->role_id = $role_id;
    }

    /**
     * @return string
     */
    public function getFirstName(): ?string
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
    public function getLastName(): ?string
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
    public function getEmail(): ?string
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
     * @return int
     */
    public function getRoleId(): ?int
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


}