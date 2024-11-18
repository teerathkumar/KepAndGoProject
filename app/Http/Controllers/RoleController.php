<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view role', ['only' => ['index']]);
        $this->middleware('permission:create role', ['only' => ['create', 'store', 'addPermissionToRole', 'givePermissionToRole']]);
        $this->middleware('permission:update role', ['only' => ['update', 'edit']]);
        $this->middleware('permission:delete role', ['only' => ['destroy']]);
    }

    public function index()
    {

        $roles = Role::get();
        return Inertia::render('Roles/Index', ['roles' => $roles]);
    }

    public function create()
    {
        $permissions = Permission::all()->toArray();
        $roles = Role::pluck('name')->all();
//        $userRoles = Auth()->user()->roles;

//        dd($permissions);
        return Inertia::render('Roles/Create',
            [
                'permissions' => $permissions,
                'roles' => $roles,
//                'userRoles' => $userRoles
            ]
        );
    }

    public function store(Request $request)
    {
//        dd($request->all());
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name'
            ],
        ]);
//        $superAdminRole = Role::findByName('super-admin');
//        $allPermissionNames = Permission::pluck('name')->toArray();
//        $superAdminRole->givePermissionTo($allPermissionNames);
//
//        Auth()->user()->syncRoles($superAdminRole);

        $permissions = $request->permissions;
        $allPermissionNames = Permission::whereIn('id', $permissions)->pluck('name')->toArray();
        $role = Role::create([
            'name' => $request->name
        ]);
        $role->givePermissionTo($allPermissionNames);


        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function edit(Role $role)
    {
//        dd($role);
        $permissions = Permission::all()->toArray();
        $rolePermissions = Role::with('permissions')->find($role->id)->toArray();
        $userPermissions = [];
        if ($rolePermissions['permissions']) {
            foreach ($rolePermissions['permissions'] as $permission) {
                $userPermissions[] = $permission['id'];
            }
        }
//        dd($userPermissions);
        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $userPermissions
        ]);
    }

    public function update(Request $request, Role $role)
    {
//        dd($request->all());
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name,' . $role->id
            ]
        ]);

        $role->update([
            'name' => $request->name
        ]);
        $permissions = $request->permissions;
        $allPermissionNames = Permission::whereIn('id', $permissions)->pluck('name')->toArray();
        $role->syncPermissions($allPermissionNames);
        return redirect()->route('roles.index')->with('success', 'Role Updated Successfully');
    }

    public function destroy($roleId)
    {
        $role = Role::find($roleId);
        $role->delete();
        return redirect('roles')->with('status', 'Role Deleted Successfully');
    }

    public function addPermissionToRole($roleId)
    {
        $permissions = Permission::get();
        $role = Role::findOrFail($roleId);
        $rolePermissions = DB::table('role_has_permissions')
            ->where('role_has_permissions.role_id', $role->id)
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();

        return view('role-permission.role.add-permissions', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions
        ]);
    }

    public function givePermissionToRole(Request $request, $roleId)
    {
        $request->validate([
            'permission' => 'required'
        ]);

        $role = Role::findOrFail($roleId);
        $role->syncPermissions($request->permission);

        return redirect()->back()->with('status', 'Permissions added to role');
    }
}
