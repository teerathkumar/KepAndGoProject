<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Lead;
use Illuminate\Support\Facades\Validator;

class LeadsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view lead', ['only' => ['index']]);
        $this->middleware('permission:create lead', ['only' => ['create','store']]);
        $this->middleware('permission:update lead', ['only' => ['update','edit']]);
        $this->middleware('permission:delete lead', ['only' => ['destroy']]);
    }

    //
    public function  index()
    {
//        $sid = "ACb2eda2e44379827f0e35a45796f2d1d3";
//        $token = "a4d4ab8b961abfc3d1fbda594e154abf";
////        $client = new \Twilio\Rest\Client($sid, $token);
//        $twilio = new \Twilio\Rest\Client($sid, $token);
//
//        $message = $twilio->messages
//            ->create("whatsapp:+923332511584", // to
//                array(
////                    "from" => "whatsapp:+13343453103",
//                    "from" => "whatsapp:+14155238886",
//                    //14155238886
////                    "contentSid" => "HXb5b62575e6e4ff6129ad7c8efe1f983e",
////                    "contentVariables" => '{"1":"12/1","2":"3pm"}',
//              "body" => "Your Message"
//            )
//          );
//
//    print($message->sid);
//
//// Use the Client to make requests to the Twilio REST API
//        $client->messages->create(
//        // The number you'd like to send the message to
//            '+923332511584',
//            [
//                // A Twilio phone number you purchased at https://console.twilio.com
//                'from' => 'whatsapp:+13343453103',
//                // The body of the text message you'd like to send
//                'body' => "Hey Jenny! Good luck on the bar exam!"
//            ]
//        );

        $leads = Lead::with('customer','service')->get();

        return Inertia::render('Leads/Index', ['leads' => $leads]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create()

    {
        $customers = Customer::all();
        $services = Service::all();

        return Inertia::render('Leads/Create', ['customers' => $customers, 'services' => $services]);

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

            'body' => ['required'],
            'customer_id' => ['required'],
            'service_id' => ['required'],

        ])->validate();


        Lead::create($request->all());


        return redirect()->route('leads.index');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(Lead $lead)

    {
        $customers = Customer::all();
        $services = Service::all();


        return Inertia::render('Leads/Edit', [

            'lead' => $lead,
            'customers' => $customers,
            'services' => $services

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

            'body' => ['required'],
            'customer_id' => ['required'],
            'service_id' => ['required'],

        ])->validate();


        Lead::find($id)->update($request->all());

        return redirect()->route('leads.index');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        Lead::find($id)->delete();
        return redirect()->route('leads.index');
    }
}
