import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link} from '@inertiajs/react';


export default function Dashboard(props) {


    const {data, setData, errors, post} = useForm({

        name: "",

        phone: "",
        email: "",
        address: ""

    });


    function handleSubmit(e) {

        e.preventDefault();

        post(route("customers.store"));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Customer</h2>}

        >

            <Head title="Customers"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">All Customers</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("customers.index")}

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

                                    <label className="">Phone</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="phone"

                                        name="phone"

                                        errors={errors.phone}

                                        value={data.phone}

                                        onChange={(e) =>

                                            setData("phone", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.phone}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Email</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="email"

                                        name="email"

                                        errors={errors.email}

                                        value={data.email}

                                        onChange={(e) =>

                                            setData("email", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.email}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Address</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="address"

                                        name="address"

                                        errors={errors.address}

                                        value={data.address}

                                        onChange={(e) =>

                                            setData("address", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.address}

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
