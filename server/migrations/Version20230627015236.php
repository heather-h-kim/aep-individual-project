<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230627015236 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("ALTER TABLE level_lookup ALTER COLUMN level_lookup_id SET DEFAULT nextval('level_lookup_level_lookup_id_seq')");
        $this->addSql("ALTER TABLE round_lookup ALTER COLUMN round_lookup_id SET DEFAULT nextval('round_lookup_round_lookup_id_seq')");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level_lookup ALTER COLUMN level_lookup_id DROP DEFAULT');
        $this->addSql('ALTER TABLE round_lookup ALTER COLUMN round_lookup_id DROP DEFAULT');
    }
}
