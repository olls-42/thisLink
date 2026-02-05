<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;


class ReferralLinkDto {
    public $id;
    
    #[Assert\Length(
        min: 20,
        max: 50,
        minMessage: 'title: Title must be at least {{ limit }} characters long',
        maxMessage: 'title: Title cannot be longer than {{ limit }} characters',
    )]
    public $title;
    
    public $description;

    #[Assert\Length(
        min: 20,
        max: 50,
        minMessage: 'referralUrl: Referral URL must be at least {{ limit }} characters long',
        maxMessage: 'referralUrl: Referral URL name cannot be longer than {{ limit }} characters',
    )]
    #[Assert\Url(
        message: 'referralUrl: Referral URL is not a valid URL'
    )]
    public $referralUrl;
}