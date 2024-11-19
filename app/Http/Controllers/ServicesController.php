<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class ServicesController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view service', ['only' => ['index']]);
        $this->middleware('permission:create service', ['only' => ['create','store']]);
        $this->middleware('permission:update service', ['only' => ['update','edit']]);
        $this->middleware('permission:delete service', ['only' => ['destroy']]);
    }

    //
    public function index()

    {
//        $superAdminRole = Role::findByName('super-admin');
//        $allPermissionNames = Permission::pluck('name')->toArray();
//        $superAdminRole->givePermissionTo($allPermissionNames);
//        Auth()->user()->syncRoles($superAdminRole);
        $services = Service::paginate();

        return Inertia::render('Services/Index', ['services' => $services]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create()

    {
        return Inertia::render('Services/Create');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function store(Request $request)

    {

        Validator::make($request->all(), [

            'name' => ['required']
        ])->validate();


        Service::create($request->all());


        return redirect()->route('services.index')->with('success', 'Service created successfully.');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(Service $service)

    {

        return Inertia::render('Services/Edit', [

            'service' => $service

        ]);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function update($id, Request $request)

    {

        Validator::make($request->all(), [

            'name' => ['required']

        ])->validate();


        Service::find($id)->update($request->all());

        return redirect()->route('services.index')->with('success', 'Service updated successfully.');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Service::find($id)->delete();
        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
