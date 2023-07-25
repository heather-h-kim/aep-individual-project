<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230725213913 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" ALTER first_name TYPE VARCHAR(12)');
        $this->addSql('ALTER TABLE "user" ALTER last_name TYPE VARCHAR(12)');
        $this->addSql('ALTER TABLE "user" ALTER email TYPE VARCHAR(24)');
        $this->addSql('ALTER TABLE "user" ALTER fgcolor TYPE VARCHAR(10)');
        $this->addSql('ALTER TABLE "user" ALTER bgcolor TYPE VARCHAR(10)');
        $this->addSql('ALTER TABLE "user" ALTER username TYPE VARCHAR(10)');
        $this->addSql('ALTER TABLE "user" ALTER auth0token TYPE VARCHAR(50)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" ALTER first_name TYPE VARCHAR(50)');
        $this->addSql('ALTER TABLE "user" ALTER last_name TYPE VARCHAR(100)');
        $this->addSql('ALTER TABLE "user" ALTER email TYPE VARCHAR(100)');
        $this->addSql('ALTER TABLE "user" ALTER fgcolor TYPE VARCHAR(50)');
        $this->addSql('ALTER TABLE "user" ALTER bgcolor TYPE VARCHAR(50)');
        $this->addSql('ALTER TABLE "user" ALTER username TYPE VARCHAR(50)');
        $this->addSql('ALTER TABLE "user" ALTER auth0token TYPE VARCHAR(100)');

    }
}
