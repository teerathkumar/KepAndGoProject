<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TicketsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view ticket', ['only' => ['index']]);
        $this->middleware('permission:create ticket', ['only' => ['create','store']]);
        $this->middleware('permission:update ticket', ['only' => ['update','edit']]);
        $this->middleware('permission:delete ticket', ['only' => ['destroy']]);
    }

    //
    public function index()

    {

        $tickets = Ticket::with('lead','user')->paginate();

        return Inertia::render('Tickets/Index', ['tickets' => $tickets]);

    }

    public function chat($id){
        $ticket = Ticket::with('lead.customer','user')->find($id)->toArray();
//        dd($ticket);
        return Inertia::render('Tickets/Chat', ['ticket' => $ticket]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create()

    {
        $users = User::all();
        $leads = Lead::all();

        return Inertia::render('Tickets/Create', ['users' => $users, 'leads' => $leads]);

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


        return redirect()->route('tickets.index')->with('success', 'Ticket created successfully.');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(Ticket $ticket)

    {
        $users = User::all();
        $leads = Lead::all();
        return Inertia::render('Tickets/Edit', [

            'ticket' => $ticket,
            'users' => $users,
            'leads' => $leads

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

        return redirect()->route('tickets.index')->with('success', 'Ticket updated successfully.');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Ticket::find($id)->delete();
        return redirect()->route('tickets.index')->with('success', 'Ticket deleted successfully.');
    }
}
