import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link} from '@inertiajs/react';


export default function Dashboard(props) {


    const {data, setData, errors, post} = useForm({

        title: "",
        lead_id: "",
        user_id: ""

    });


    function handleSubmit(e) {

        e.preventDefault();

        post(route("tickets.store"));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Ticket</h2>}

        >

            <Head title="Leads"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Add Ticket</h5>
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

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="Lead"

                                        name="lead"

                                        errors={errors.lead_id}

                                        value={data.lead_id}

                                        onChange={(e) =>

                                            setData("lead_id", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.lead_id}

                                        </span>

                                </div>

                                <div className="mb-2">

                                    <label className="">User</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="User"

                                        name="user_id"

                                        errors={errors.user_id}

                                        value={data.user_id}

                                        onChange={(e) =>

                                            setData("user_id", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.user_id}

                                        </span>

                                </div>


                            </div>

                            <div className="mt-4">

                                <button

                                    type="submit"

                                    className="btn bg-gradient-primary btn-sm mb-5"

                                >

                                    Save

                                </button>

                            </div>

                        </form>


                    </div>

                </div>

            </div>

        </Authenticated>

    );

}
