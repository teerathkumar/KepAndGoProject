<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    //
    public function index()

    {

        $services = Service::all();

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


        return redirect()->route('services.index');

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

        return redirect()->route('services.index');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Service::find($id)->delete();
        return redirect()->route('services.index');
    }
}
