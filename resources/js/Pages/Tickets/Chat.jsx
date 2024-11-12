import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link,usePage} from '@inertiajs/react';


export default function Dashboard(props) {

    const {ticket} = usePage().props;

    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Chat</h2>}

        >

            <Head title="Customer Chat"/>


            <div className="col-12">

                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">

                            <div className="chat">
                                <div className="chat-header clearfix">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                     alt="avatar"/>
                                            </a>
                                            <div className="chat-about">
                                                <h6 className="m-b-0">{ticket.lead.customer.name}</h6>
                                                <small>Last seen: 2 hours ago</small>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 hidden-sm text-right">
                                            <a href="javascript:void(0);" className="btn btn-outline-secondary"><i
                                                className="fa fa-camera"></i></a>
                                            <a href="javascript:void(0);" className="btn btn-outline-primary"><i
                                                className="fa fa-image"></i></a>
                                            <a href="javascript:void(0);" className="btn btn-outline-info"><i
                                                className="fa fa-cogs"></i></a>
                                            <a href="javascript:void(0);" className="btn btn-outline-warning"><i
                                                className="fa fa-question"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-history">
                                    <ul className="m-b-0">
                                        <li className="clearfix text-left">
                                            <div className="message-data">
                                                <span className="message-data-time">10:15 AM, Today</span>
                                            </div>
                                            <div className="message my-message">Project has been already finished and
                                                I have results to show you.
                                            </div>

                                        </li>
                                        <li className="clearfix  text-right">
                                            <div className="message-data">
                                                <span className="message-data-time">10:15 AM, Today</span>
                                            </div>
                                            <div className="message other-message">Project has been already finished and
                                                I
                                                have results to show you.
                                            </div>
                                        </li>
                                        <li className="clearfix  text-right">
                                            <div className="message-data">
                                                <span className="message-data-time">10:15 AM, Today</span>
                                            </div>
                                            <div className="message other-message">Project has been already finished and
                                                I
                                                have results to show you.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">
                                        <input type="text" className="form-control" placeholder="Enter text here..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Authenticated>
    )
}
