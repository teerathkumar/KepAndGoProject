<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class OfficesController extends Controller
{
    //
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function index()

    {

        $offices = Office::with("parent")->get();

        return Inertia::render('Offices/Index', ['offices' => $offices]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create()

    {
        $offices = Office::all();
        return Inertia::render('Offices/Create', ['offices' => $offices]);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function store(Request $request)

    {

        Validator::make($request->all(), [

            'name' => ['required'],

            'parent_id' => ['required'],

        ])->validate();


        Office::create($request->all());


        return redirect()->route('offices.index');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(Office $office)

    {

        return Inertia::render('Offices/Edit', [

            'office' => $office

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

            'name' => ['required'],

            'parent_id' => ['required'],

        ])->validate();


        Office::find($id)->update($request->all());

        return redirect()->route('offices.index');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Office::find($id)->delete();
        return redirect()->route('offices.index');
    }
}
