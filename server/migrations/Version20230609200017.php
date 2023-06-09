<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230609200017 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE round_lookup_round_lookup_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE round_lookup (round_lookup_id INT NOT NULL, round_number INT NOT NULL, PRIMARY KEY(round_lookup_id))');
        $this->addSql('ALTER TABLE level DROP level_number');
        $this->addSql('ALTER TABLE round RENAME COLUMN round_number TO round_lookup_id');
        $this->addSql('ALTER TABLE round ADD CONSTRAINT FK_C5EEEA342B6CBC8 FOREIGN KEY (round_lookup_id) REFERENCES round_lookup (round_lookup_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C5EEEA342B6CBC8 ON round (round_lookup_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE round DROP CONSTRAINT FK_C5EEEA342B6CBC8');
        $this->addSql('DROP SEQUENCE round_lookup_round_lookup_id_seq CASCADE');
        $this->addSql('DROP TABLE round_lookup');
        $this->addSql('DROP INDEX UNIQ_C5EEEA342B6CBC8');
        $this->addSql('ALTER TABLE round RENAME COLUMN round_lookup_id TO round_number');
        $this->addSql('ALTER TABLE level ADD level_number INT NOT NULL');
    }
}
