<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    // 1. Send Link
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            // 👇 RESTRICTION ADDED HERE
            'email' => 'required|email|ends_with:ump.ac.ma'
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Lien de réinitialisation envoyé ! Vérifiez votre email.']);
        }

        return response()->json(['message' => 'Impossible d\'envoyer le lien.'], 400);
    }

    // 2. Reset Password
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            // 👇 RESTRICTION ADDED HERE TOO (For security)
            'email' => 'required|email|ends_with:ump.ac.ma', 
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();
                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Mot de passe modifié avec succès !']);
        }

        return response()->json(['message' => 'Token ou email invalide.'], 400);
    }
}