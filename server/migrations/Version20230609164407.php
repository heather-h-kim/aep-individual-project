<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230609164407 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level DROP CONSTRAINT fk_9aeacc1367d5e0c3');
        $this->addSql('DROP SEQUENCE unit_score_unit_score_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE level_lookup_level_lookup_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE level_lookup (level_lookup_id INT NOT NULL, level_number INT NOT NULL, unit_score INT NOT NULL, PRIMARY KEY(level_lookup_id))');
        $this->addSql('ALTER TABLE unit_score DROP CONSTRAINT fk_b9ab495a5fb14ba7');
        $this->addSql('DROP TABLE unit_score');
        $this->addSql('DROP INDEX uniq_9aeacc1367d5e0c3');
        $this->addSql('ALTER TABLE level ADD level_lookup_id INT NOT NULL');
        $this->addSql('ALTER TABLE level DROP unit_score_id');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC13F0BBFEC FOREIGN KEY (level_lookup_id) REFERENCES level_lookup (level_lookup_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9AEACC13F0BBFEC ON level (level_lookup_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE level DROP CONSTRAINT FK_9AEACC13F0BBFEC');
        $this->addSql('DROP SEQUENCE level_lookup_level_lookup_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE unit_score_unit_score_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE unit_score (unit_score_id INT NOT NULL, level_id INT DEFAULT NULL, unit_score_name VARCHAR(30) NOT NULL, score INT NOT NULL, PRIMARY KEY(unit_score_id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_b9ab495a5fb14ba7 ON unit_score (level_id)');
        $this->addSql('ALTER TABLE unit_score ADD CONSTRAINT fk_b9ab495a5fb14ba7 FOREIGN KEY (level_id) REFERENCES level (level_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE level_lookup');
        $this->addSql('DROP INDEX UNIQ_9AEACC13F0BBFEC');
        $this->addSql('ALTER TABLE level ADD unit_score_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE level DROP level_lookup_id');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT fk_9aeacc1367d5e0c3 FOREIGN KEY (unit_score_id) REFERENCES unit_score (unit_score_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_9aeacc1367d5e0c3 ON level (unit_score_id)');
    }
}
