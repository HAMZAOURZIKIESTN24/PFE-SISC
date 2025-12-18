<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
       // $middleware->validateCsrfTokens(except: [
          //  'register', // <--- This allows /register to work without a token
          //  'login',    // <--- Add this too if you want login in web.php
        //]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
