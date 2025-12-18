<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function login(Request $request)
    {
        // 1. Validate Input
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // 2. Check Email
        $user = User::where('email', $fields['email'])->first();

        // 3. Check Password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'msg' => 'Email ou mot de passe incorrect' // Matches the frontend error handling
            ], 401);
        }

        // 4. Create Token
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Return Response
        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token
        ], 200);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
