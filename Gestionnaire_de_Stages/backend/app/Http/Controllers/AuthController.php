<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        // Générer un token simple
        $token = Str::random(60);

        $user->api_token = $token;
        $user->save();

        return response()->json([
            'token' => $token,
            'user' => [
                'id'    => $user->id,
                'email' => $user->email
            ]
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
