<?php

namespace App\Http\Controllers;

use App\Laravue\Models\Role;
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

class InfoUserController extends Controller
{

    public function index(){
        $users = User::all();
        return Inertia::render('Users/Index', ['users'=>$users]);
    }
    public function create()
    {
        $locations = Office::all();
        return Inertia::render('Users/Create', ['locations'=>$locations]);
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
            'role'=>['required'],
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

        unset($attributes['role']);

//        dd($attributes);

        User::create([
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'phone' => $attributes['phone'],
            'location' => $attributes['location'],
            'password'=>Hash::make($attributes['password']),
            'photo' => $attributes['photo']
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }
    public function edit(User $user)

    {

        $locations = Office::all();
        return Inertia::render('Users/Edit', [

            'user' => $user,
            'locations'=>$locations,

        ]);

    }
    public function update(Request $request, User $user){
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
            'email' => ['required', 'email', 'max:50', Rule::unique('users')->ignore(Auth::user()->id)],
            'phone'     => ['max:50'],
            'location' => ['max:70'],
            'role'=>['required'],
            'password' => ['required', 'min:8', 'confirmed'],
        ]);
        if($request->hasfile('photo')){
            $photo = $request->file('photo');
            $filename = time().".".$photo->getClientOriginalExtension();
            $path=$photo->storeAs('uploads', $filename, 'public');
            $attributes['photo'] = $path;
        } else {
            $attributes['photo'] = null;
        }

        unset($attributes['role']);
        $user->update($attributes);
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
