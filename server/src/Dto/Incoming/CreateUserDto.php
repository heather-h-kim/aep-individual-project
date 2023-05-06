<?php

namespace App\Dto\Incoming;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

class CreateUserDto
{
    #[NotNull]
    #[Type('string')]
    private string $first_name;

    #[NotNull]
    #[Type('string')]
    private string $last_name;

    #[NotNull]
    #[Type('string')]
    private string $email;

    #[NotNull]
    #[Type('string')]
    private string $fgcolor;

    #[NotNull]
    #[Type('string')]
    private string $bgcolor;

    #[NotNull]
    #[Type('int')]
    private int $role_id;

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
    public function getFgcolor(): string
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
    public function getBgcolor(): string
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

//    public function __construct(string $first_name, string $last_name, string $email, string $fgcolor, string $bgcolor, int $role_id)
//    {
//        $this->first_name = $first_name;
//        $this->last_name = $last_name;
//        $this->email = $email;
//        $this->fgcolor = $fgcolor;
//        $this->bgcolor = $bgcolor;
//        $this->role_id = $role_id;
//    }
//
//
//
//    public function getFirstName(): ?string
//    {
//        return $this->first_name;
//    }
//
//    public function getLastName(): ?string
//    {
//        return $this->last_name;
//    }
//
//    public function getEmail(): ?string
//    {
//        return $this->email;
//    }
//
//    public function getFgColor(): ?string
//    {
//        return $this->fgcolor;
//    }
//
//    public function getBgColor(): ?string
//    {
//        return $this->bgcolor;
//    }
//
//    public function getRoleId(): ?int
//    {
//        return $this->role_id;
//    }



}