import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, usePage, Link} from '@inertiajs/react';
export default function Dashboard(props) {


    const {ticket, leads, users} = usePage().props;

    const {data, setData, put, errors} = useForm({

        title: ticket.title || "",
        lead_id: ticket.lead_id || "",
        user_id: ticket.user_id || "",
        status: ticket.status || ""


    });


    function handleSubmit(e) {

        e.preventDefault();

        put(route("tickets.update", ticket.id));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Ticket</h2>}

        >

            <Head title="Customers"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Update Ticket</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("tickets.index")}

                            >

                                Back

                            </Link>

                        </div>


                        <form name="createForm" onSubmit={handleSubmit}>

                            <div className="flex flex-col">

                                <div className="mb-2">

                                    <label className="">Title</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="Title"

                                        name="title"

                                        value={data.title}

                                        onChange={(e) =>

                                            setData("title", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.title}

                                        </span>

                                </div>

                                <div className="mb-2">

                                    <label className="">Lead</label>

                                    <select className="w-full rounded" label="lead_id"

                                            name="lead_id"

                                            errors={errors.lead_id}

                                            value={data.lead_id}

                                            onChange={(e) =>

                                                setData("lead_id", e.target.value)

                                            }>
                                        <option value="0">No Lead</option>
                                        {
                                            leads.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.title}</option>
                                                );
                                            })
                                        }
                                    </select>

                                    <span className="text-red-600">

                                            {errors.lead_id}

                                        </span>

                                </div>

                                <div className="mb-2">

                                    <label className="">User</label>


                                    <select className="w-full rounded" label="user_id"

                                            name="user_id"

                                            errors={errors.user_id}

                                            value={data.user_id}

                                            onChange={(e) =>

                                                setData("user_id", e.target.value)

                                            }>
                                        <option value="0">No User</option>
                                        {
                                            users.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.name}</option>
                                                );
                                            })
                                        }
                                    </select>

                                    <span className="text-red-600">

                                            {errors.user_id}

                                        </span>

                                </div>

                                <div className="mb-2">

                                    <label className="">Status</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="Status"

                                        name="status"

                                        errors={errors.status}

                                        value={data.status}

                                        onChange={(e) =>

                                            setData("status", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.status}

                                        </span>

                                </div>


                            </div>
                            <div className="mt-4">

                                <button

                                    type="submit"

                                    className="btn bg-gradient-primary btn-sm mb-5"

                                >

                                    Update

                                </button>

                            </div>


                        </form>


                    </div>

                </div>

            </div>

        </Authenticated>

    )
        ;

}
