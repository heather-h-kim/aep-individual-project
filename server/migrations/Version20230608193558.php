<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230608193558 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE round_round_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE round (round_id INT NOT NULL, level_id INT NOT NULL, round_number INT NOT NULL, is_correct INT NOT NULL, played_at DATE NOT NULL, number_shown INT NOT NULL, number_entered INT NOT NULL, PRIMARY KEY(round_id))');
        $this->addSql('CREATE INDEX IDX_C5EEEA345FB14BA7 ON round (level_id)');
        $this->addSql('ALTER TABLE round ADD CONSTRAINT FK_C5EEEA345FB14BA7 FOREIGN KEY (level_id) REFERENCES level (level_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE round_round_id_seq CASCADE');
        $this->addSql('ALTER TABLE round DROP CONSTRAINT FK_C5EEEA345FB14BA7');
        $this->addSql('DROP TABLE round');
    }
}
