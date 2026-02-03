<?php

// src/Controller/LuckyController.php
namespace App\Controller;

use App\Entity\ReferralLink;
use App\Repository\ReferralLinkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use ReferralLinkDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

class ReferralLinkController  extends AbstractController
{
    public function __construct(
        private LoggerInterface $logger,
        private EntityManagerInterface $em,
        private ReferralLinkRepository $repo,
    ) {
        $this->logger->debug(self::class . 'constructor initiated');
    }

    #[Route('/referral-link', name: 'create_referral-link', methods: ['POST'])]
    public function create(
        #[MapRequestPayload] ReferralLinkDto $dto
    ): JsonResponse
    {
        $rf = new ReferralLink();
        $rf->setTitle($dto->title);
        $rf->setDescription($dto->description);
        $rf->setUrl($dto->referralUrl);

        $this->repo->save($rf, true);

        return $this->json([
            'status' => 'created'
        ], Response::HTTP_CREATED);
    }

    #[Route('/referral-link', name: 'retrive_referral-link')]
    public function read(
        #[MapQueryString] string $id
    ): JsonResponse
    {
        return $this->json( [
            'item' => $this->repo->find($id)
        ]);
    }
}