<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class CustomersController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function index()

    {

        $customers = Customer::all();

        return Inertia::render('Customers/Index', ['customers' => $customers]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create()

    {

        return Inertia::render('Customers/Create');

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

            'phone' => ['required'],
            'email' => ['required'],
            'address' => ['required'],

        ])->validate();


        Customer::create($request->all());


        return redirect()->route('customers.index');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(Customer $customer)

    {

        return Inertia::render('Customers/Edit', [

            'customer' => $customer

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

            'phone' => ['required'],
            'email' => ['required'],
            'address' => ['required'],

        ])->validate();


        Customer::find($id)->update($request->all());

        return redirect()->route('customers.index');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Customer::find($id)->delete();
        return redirect()->route('customers.index');
    }
}
