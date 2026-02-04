<?php

// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class LuckyController  extends AbstractController
{
    #[Route('/lucky/number/{max}', name: 'app_lucky_number')]
    public function number(int $max): JsonResponse
    {
        $number = random_int(0, $max);

        return $this->json(['number' => $number]);
    }
    
    #[Route('/lucky/numberz/{max}', name: 'app_lucky-number')]
    public function number_(int $max): JsonResponse
    {
        $number = random_int(0, $max);

        return $this->json(['number' => $number]);
    }
}