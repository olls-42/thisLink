<?php

namespace App\Controller;

use App\Entity\ReferralLink;
use App\Repository\ReferralLinkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Dto\ReferralLinkDto;
use App\Dto\PaginationQueryDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
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

    #[Route('/referral-link', name: 'referral_link_create', methods: ['POST'])]
    public function create(
        #[MapRequestPayload] ReferralLinkDto $dto,
        #[MapQueryParameter('validate')] ?string $validateOnly
    ): JsonResponse
    {
        $rf = new ReferralLink();
        $rf->setTitle($dto->title);
        $rf->setDescription($dto->description);
        $rf->setReferralUrl($dto->referralUrl);

        if (boolval($validateOnly)) {
            return $this->json([
                'status' => 'valid'
            ], Response::HTTP_CREATED);
        }
        
        $this->repo->save($rf, true);

        return $this->json([
            'status' => 'created'
        ], Response::HTTP_CREATED);
    }


    #[Route('/referral-link/{id}', name: 'referral_link_read')]
    public function read( string $id): JsonResponse
    {
        return $this->json( [
            'item' => $this->repo->find($id)
        ]);
    }

    #[Route('/referral-link/{id}', name: 'referral_link_update', methods: ['PUT'])]
    public function update( string $id,  
           #[MapRequestPayload] ReferralLinkDto $dto
    ): JsonResponse
    {
        /** @var \App\Entity\ReferralLink */
        $rf = $this->repo->find($id);

        $rf->setTitle($dto->title);
        $rf->setDescription($dto->description);
        $rf->setReferralUrl($dto->referralUrl);

        return $this->json( [
            'item' => $this->repo->save($rf)
        ]);
    }

    #[Route('/referral-link/list', name: 'referral_link_list',  priority: 2)]
    public function list(
        #[MapQueryString] PaginationQueryDto $paginationQuery
    ): JsonResponse
    {
        return $this->json( [
            'items' => $this->repo->findAll()
        ]);
    }
}