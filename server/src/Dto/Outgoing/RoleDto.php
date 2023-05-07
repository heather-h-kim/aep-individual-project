<?php

namespace App\Dto\Outgoing;

class RoleDto
{
    private int $role_id;
    private string $name;

    public function __construct(int $role_id, string $name)
    {
        $this->role_id = $role_id;
        $this->name = $name;
    }

    public function getRoleId(): int
    {
        return $this->role_id;
    }

    public function getRoleName(): string
    {
        return $this->name;
    }

}