<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230608192458 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE level_level_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE unit_score_unit_score_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE level (level_id INT NOT NULL, game_id INT NOT NULL, unit_score_id INT DEFAULT NULL, level_number INT NOT NULL, PRIMARY KEY(level_id))');
        $this->addSql('CREATE INDEX IDX_9AEACC13E48FD905 ON level (game_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9AEACC1367D5E0C3 ON level (unit_score_id)');
        $this->addSql('CREATE TABLE unit_score (unit_score_id INT NOT NULL, level_id INT DEFAULT NULL, unit_score_name VARCHAR(30) NOT NULL, score INT NOT NULL, PRIMARY KEY(unit_score_id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B9AB495A5FB14BA7 ON unit_score (level_id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC13E48FD905 FOREIGN KEY (game_id) REFERENCES game (game_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC1367D5E0C3 FOREIGN KEY (unit_score_id) REFERENCES unit_score (unit_score_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE unit_score ADD CONSTRAINT FK_B9AB495A5FB14BA7 FOREIGN KEY (level_id) REFERENCES level (level_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE level_level_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE unit_score_unit_score_id_seq CASCADE');
        $this->addSql('ALTER TABLE level DROP CONSTRAINT FK_9AEACC13E48FD905');
        $this->addSql('ALTER TABLE level DROP CONSTRAINT FK_9AEACC1367D5E0C3');
        $this->addSql('ALTER TABLE unit_score DROP CONSTRAINT FK_B9AB495A5FB14BA7');
        $this->addSql('DROP TABLE level');
        $this->addSql('DROP TABLE unit_score');
    }
}
