<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\User;
use Geocoder\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
class InfoUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view user', ['only' => ['index']]);
        $this->middleware('permission:create user', ['only' => ['create','store']]);
        $this->middleware('permission:update user', ['only' => ['update','edit']]);
        $this->middleware('permission:delete user', ['only' => ['destroy']]);
    }

    public function index(){
        $users = User::paginate();
        return Inertia::render('Users/Index', ['users'=>$users]);
    }
    public function create()
    {
        $locations = Office::all();
        $roles = Role::all();
        return Inertia::render('Users/Create', ['locations'=>$locations,'roles'=>$roles]);
    }

    public function store(Request $request)
    {
//
//        $request->validate([
//            'name' => ['required', 'string', 'max:255'],
//            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
//            'password' => ['required', 'string', 'min:8', 'confirmed'],
//
//        ]);
//        dd($request->all());
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
            'email' => ['required', 'email', 'max:50', Rule::unique('users')->ignore(Auth::user()->id)],
            'phone'     => ['max:50'],
            'location' => ['max:70'],
            'roles'=>['required'],
            'password' => ['required', 'min:8', 'confirmed'],
        ]);
        if($request->hasfile('photo')){
            $photo = $request->file('photo');
            $filename = "myfilenameishere_".time().".".$photo->getClientOriginalExtension();
            $path=$photo->storeAs('uploads', $filename, 'public');
            $attributes['photo'] = $path;
        } else {
            $attributes['photo'] = null;
        }

        unset($attributes['roles']);

//        dd($attributes);

        $user = User::create([
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'phone' => $attributes['phone'],
            'location' => $attributes['location'],
            'password'=>Hash::make($attributes['password']),
            'photo' => $attributes['photo']
        ]);
        $user->syncRoles($request->roles);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }
    public function edit(User $user)

    {
        $roles = Role::all();
        $userRoles = $user->roles->pluck('name','name')->all();
        $locations = Office::all();
        return Inertia::render('Users/Edit', [

            'user' => $user,
            'locations'=>$locations,
            'roles'=>$roles,
            'userRoles'=>$userRoles,

        ]);

    }
    public function update(Request $request, User $user){
//        dd($request->all());
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
            'email' => ['required', 'email', 'max:50', Rule::unique('users')->ignore($user->id)],
            'phone'     => ['max:50'],
            'location' => ['max:70'],
            'roles'=>['required'],
            'password' => ['required', 'min:8', 'confirmed'],
        ]);
        if($request->hasfile('photo')){
            $photo = $request->file('photo');
            $filename = time().".".$photo->getClientOriginalExtension();
            $path=$photo->storeAs('uploads', $filename, 'public');
            $attributes['photo'] = $path;
        }

        unset($attributes['roles']);
        $user->update($attributes);
        $user->syncRoles($request->roles);
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }
    public function updateStatus(Request $request, $user_id){
//        dd($user);
//        dd($request->all());
//        dd($user_id);
        $user = User::find($user_id);
        $user->update($request->only('status'));
        return redirect()->route('users.index')->with('success', 'User status updated successfully.');
    }

    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
