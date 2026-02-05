<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;


class ReferralLinkDto {
    public $id;
    

    #[Assert\NotBlank(message: 'title: is required')]
    public $title;
    
    public $description;

    // messages want't working corectly
    // #[Assert\Length(
    //     min: 20,
    //     max: 50,
    //     minMessage: 'referralUrl: Referral URL must be at least {{ limit }} characters long',
    //     maxMessage: 'referralUrl: Referral URL name cannot be longer than {{ limit }} characters',
    // )]
    #[Assert\Url(
        message: 'referralUrl: Referral URL is not a valid URL'
    )]
    public $referralUrl;
}