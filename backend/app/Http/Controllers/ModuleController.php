<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ModuleController extends Controller
{
    // POST /api/admin/modules
    // Optional endpoint if you want to add one module only
    public function store(Request $request)
    {
        $data = $request->validate([
            'filiere_id' => ['required', 'integer', 'exists:filieres,id'],
            'nom' => ['required', 'string', 'max:255'],
            'semestre' => ['required', 'string', Rule::in(['S1', 'S2', 'S3', 'S4'])],
        ]);

        $module = Module::create($data);

        return response()->json($module, 201);
    }

    // PUT /api/admin/modules/{module}
    public function update(Request $request, Module $module)
    {
        $data = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'semestre' => ['required', 'string', Rule::in(['S1', 'S2', 'S3', 'S4'])],
        ]);

        $module->update($data);

        return response()->json($module);
    }

    // DELETE /api/admin/modules/{module}
    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(['message' => 'Module supprimé']);
    }
}
