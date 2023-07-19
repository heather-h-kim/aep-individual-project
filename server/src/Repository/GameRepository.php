<?php

namespace App\Repository;

use App\Entity\Game;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Game>
 *
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    public function save(Game $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Game $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Game[] Returns an array of Game objects
//     * @throws Exception
//     */
//    public function findAllBySeason(): array
//    {
//      $conn = $this->getEntityManager()->getConnection();
//
//      $sql = 'SELECT * FROM game WHERE season_id IS NULL';
//      return $resultSet = $conn->executeQuery($sql);
//
//      return $resultSet->fetchAllAssociative();
//    }


    /**
     * @return Game[] Returns an array of Game objects
     */
    public function findALLByNullSeason(\DateTime $start_date, \DateTime $end_date): array
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.season is NULL')
            ->andWhere('g.played_at >= :startDate')
            ->andWhere('g.played_at <= :endDate')
            ->setParameters(['startDate'=> $start_date, 'endDate'=>$end_date])
            ->orderBy('g.game_id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }


//    /**
//     * @return Game[] Returns an array of Game objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Game
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
