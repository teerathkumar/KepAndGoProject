<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TicketsController extends Controller
{
    //
    public function index()

    {

        $tickets = Ticket::with('lead','user')->get();

        return Inertia::render('Tickets/Index', ['tickets' => $tickets]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create()

    {
        return Inertia::render('Tickets/Create');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function store(Request $request)

    {

        Validator::make($request->all(), [

            'title' => ['required'],
            'lead_id' => ['required'],
            'user_id' => ['required'],

        ])->validate();


        Ticket::create($request->all());


        return redirect()->route('tickets.index');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(Ticket $ticket)

    {
        return Inertia::render('Tickets/Edit', [

            'ticket' => $ticket

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
            'title' => ['required'],
            'lead_id' => ['required'],
            'user_id' => ['required'],
            'status'=>['required']

        ])->validate();


        Ticket::find($id)->update($request->all());

        return redirect()->route('tickets.index');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Ticket::find($id)->delete();
        return redirect()->route('tickets.index');
    }
}
