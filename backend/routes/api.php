<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\ModuleController;

// URL will be: http://127.0.0.1:8000/api/login
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);

// If you already have auth (Sanctum/JWT), add middleware here.
// Example: Route::middleware('auth:sanctum')->prefix('admin')->group(function () { ... });

Route::prefix('admin')->group(function () {

    // ---------- FILIERES ----------
    // List all filières with their modules
    Route::get('/filieres', [FiliereController::class, 'index']);

    // Get one filière with its modules
    Route::get('/filieres/{filiere}', [FiliereController::class, 'show']);

    // Create filière + modules grouped by semester (your AddFilierePage)
    Route::post('/filieres', [FiliereController::class, 'store']);

    // Update filière info (name/description)
    Route::put('/filieres/{filiere}', [FiliereController::class, 'update']);

    // Delete filière (and cascade delete modules if FK cascade is set)
    Route::delete('/filieres/{filiere}', [FiliereController::class, 'destroy']);


    // ---------- MODULES ----------
    // (Optional) create one module only (if you want separate add module)
    Route::post('/modules', [ModuleController::class, 'store']);

    // Update module (rename / move to other semester S1..S4)
    Route::put('/modules/{module}', [ModuleController::class, 'update']);

    // Delete one module
    Route::delete('/modules/{module}', [ModuleController::class, 'destroy']);
});
