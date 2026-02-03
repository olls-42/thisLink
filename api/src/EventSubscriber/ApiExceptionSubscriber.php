<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class ApiExceptionSubscriber implements EventSubscriberInterface
{
    public function onKernelException(ExceptionEvent $event): void
    {
        // Get the exception object from the received event
        $exception = $event->getThrowable();
        $response = new JsonResponse();
        $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR; // Default to 500

        // Customize the response based on the exception type
        if ($exception instanceof HttpExceptionInterface) {
            $statusCode = $exception->getStatusCode();
            $response->setData([
                'error' => [
                    'code' => $statusCode,
                    'message' => $exception->getMessage(),
                ],
            ]);
        } else {
            // For generic exceptions, you might want a simpler message in production
            $message = 'An unexpected error occurred';
            if ($_SERVER['APP_ENV'] === 'dev') {
                $message = $exception->getMessage();
            }
            
            $response->setData([
                'error' => [
                    'code' => $statusCode,
                    'message' => $message,
                ],
            ]);
        }

        $response->setStatusCode($statusCode);

        // Sets the new response object to override the default Symfony error handling
        $event->setResponse($response);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }
}
