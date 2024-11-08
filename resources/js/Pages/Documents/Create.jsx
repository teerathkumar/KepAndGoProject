import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link, usePage} from '@inertiajs/react';


export default function Dashboard(props) {


    const { customers, services } = usePage().props;
    const {data, setData, errors, post} = useForm({

        title: "",

        body: "",
        customer_id: "",
        service_id: ""

    });


    function handleSubmit(e) {

        e.preventDefault();

        post(route("leads.store"));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Lead</h2>}

        >

            <Head title="Leads"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Add Lead</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("leads.index")}

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

                                    <label className="">Body</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="Body"

                                        name="body"

                                        errors={errors.body}

                                        value={data.body}

                                        onChange={(e) =>

                                            setData("body", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.body}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Customer</label>
                                    <select className="w-full rounded" label="customer_id"

                                            name="customer_id"

                                            errors={errors.customer_id}

                                            value={data.customer_id}

                                            onChange={(e) =>

                                                setData("customer_id", e.target.value)

                                            }>
                                        <option value="0">No Customer</option>
                                        {
                                            customers.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.name}</option>
                                                );
                                            })
                                        }
                                    </select>

                                    <span className="text-red-600">

                                            {errors.customer_id}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Service</label>

                                    <select className="w-full rounded" label="service_id"

                                            name="service_id"

                                            errors={errors.service_id}

                                            value={data.service_id}

                                            onChange={(e) =>

                                                setData("service_id", e.target.value)

                                            }>
                                        <option value="0">No Service</option>
                                        {
                                            services.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    <span className="text-red-600">

                                            {errors.service_id}

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
