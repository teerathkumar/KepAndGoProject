import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, usePage, Link} from '@inertiajs/react';
export default function Dashboard(props) {


    const {service} = usePage().props;

    const {data, setData, put, errors} = useForm({

        name: service.name || "",
        status: service.status || "",

    });


    function handleSubmit(e) {

        e.preventDefault();

        put(route("services.update", customer.id));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Service</h2>}

        >

            <Head title="Services"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Update Service</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("services.index")}

                            >

                                Back

                            </Link>

                        </div>


                        <form name="createForm" onSubmit={handleSubmit}>

                            <div className="flex flex-col">

                                <div className="mb-2">

                                    <label className="">Name</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="Name"

                                        name="name"

                                        value={data.name}

                                        onChange={(e) =>

                                            setData("name", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.name}

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
