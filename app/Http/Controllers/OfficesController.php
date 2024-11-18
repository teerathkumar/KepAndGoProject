<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Exceptions\UnauthorizedException;


class OfficesController extends Controller
{
    public function __construct(){
        $this->middleware('permission:view office', ['only' => ['index']]);
        $this->middleware('permission:create office', ['only' => ['create','store']]);
        $this->middleware('permission:update office', ['only' => ['update','edit']]);
        $this->middleware('permission:delete office', ['only' => ['destroy']]);
    }
    //
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function index()

    {
        try{

            $offices = Office::with("parent")->get();

            return Inertia::render('Offices/Index', ['offices' => $offices]);
        } catch (UnauthorizedException $exception) {
            dd($exception->getMessage());
        }


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
        $offices = Office::all();
        return Inertia::render('Offices/Edit', [

            'office' => $office,
            'offices' => $offices

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
