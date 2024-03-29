<?php

namespace App\Repository;

use App\Entity\Season;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Season>
 *
 * @method Season|null find($id, $lockMode = null, $lockVersion = null)
 * @method Season|null findOneBy(array $criteria, array $orderBy = null)
 * @method Season[]    findAll()
 * @method Season[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SeasonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Season::class);
    }

    public function save(Season $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Season $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    /**
     * @throws NonUniqueResultException
     */
    public function findOneByCurrentDate(DateTime $currentDate): ?Season
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.start_date <= :currentDate AND s.end_date >= :currentDate')
            ->setParameter('currentDate', $currentDate)
            ->getQuery()
            ->getOneOrNullResult();
    }


    /**
     * @return Season[] Returns an array of Season objects
     */
    public function findAllOrderedByStartDate(): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy('s.start_date', 'ASC')
            ->getQuery()
            ->getResult()
            ;
    }


    /**
     * @return Season[] Returns an array of Season objects
     */
    public function findAllSeasonsToDate(DateTime $currentDate): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.start_date <= :currentDate')
            ->setParameter('currentDate', $currentDate)
            ->orderBy('s.start_date', 'DESC')
            ->getQuery()
            ->getResult()
            ;
    }




//    /**
//     * @return Season[] Returns an array of Season objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Season
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
