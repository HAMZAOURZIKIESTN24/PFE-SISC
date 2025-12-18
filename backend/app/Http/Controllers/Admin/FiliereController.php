<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class FiliereController extends Controller
{
    // GET /api/admin/filieres
    public function index()
    {
        return response()->json(
            Filiere::with(['modules' => function ($q) {
                $q->orderBy('semestre')->orderBy('nom');
            }])->orderBy('nom')->get()
        );
    }

    // GET /api/admin/filieres/{filiere}
    public function show(Filiere $filiere)
    {
        return response()->json(
            $filiere->load(['modules' => function ($q) {
                $q->orderBy('semestre')->orderBy('nom');
            }])
        );
    }

    // POST /api/admin/filieres
    // Expected payload:
    // { nom, description?, semestres: [ { nom: "S1", modules: [ { nom: "Algo" }, ... ] }, ... ] }
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => ['required', 'string', 'max:255', 'unique:filieres,nom'],
            'description' => ['required', 'string', 'max:2000'],

            'semestres' => ['required', 'array', 'min:4'],
            'semestres.*.nom' => ['required', 'string', Rule::in(['S1', 'S2', 'S3', 'S4'])],
            'semestres.*.modules' => ['required', 'array', 'min:4'],
            'semestres.*.modules.*.nom' => ['required', 'string', 'max:255'],
        ]);

        $filiere = DB::transaction(function () use ($data) {
            $f = Filiere::create([
                'nom' => $data['nom'],
                'description' => $data['description'] ?? null,
            ]);

            foreach ($data['semestres'] as $sem) {
                foreach ($sem['modules'] as $mod) {
                    $f->modules()->create([
                        'nom' => $mod['nom'],
                        'semestre' => $sem['nom'],
                    ]);
                }
            }

            return $f;
        });

        return response()->json(
            $filiere->load('modules'),
            201
        );
    }

    // PUT /api/admin/filieres/{filiere}
    public function update(Request $request, Filiere $filiere)
    {
        $data = $request->validate([
            'nom' => ['required', 'string', 'max:255', Rule::unique('filieres', 'nom')->ignore($filiere->id)],
            'description' => ['nullable', 'string', 'max:2000'],
        ]);

        $filiere->update($data);

        return response()->json($filiere);
    }

    // DELETE /api/admin/filieres/{filiere}
    public function destroy(Filiere $filiere)
    {
        $filiere->delete(); // cascade deletes modules if FK is cascade
        return response()->json(['message' => 'Filière supprimée']);
    }
}
