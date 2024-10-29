
import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import { Head, useForm, usePage, Link } from '@inertiajs/react';



export default function Dashboard(props) {



    const { office } = usePage().props;

    const { data, setData, put, errors } = useForm({

        nama: post.name || "",

        parent_id: post.parent_id || "",

    });



    function handleSubmit(e) {

        e.preventDefault();

        put(route("offices.update", office.id));

    }



    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Office</h2>}

        >

            <Head title="Offices" />



            <div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 bg-white border-b border-gray-200">



                            <div className="flex items-center justify-between mb-6">

                                <Link

                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"

                                    href={ route("offices.index") }

                                >

                                    Back

                                </Link>

                            </div>



                            <form name="createForm" onSubmit={handleSubmit}>

                                <div className="flex flex-col">

                                    <div className="mb-4">

                                        <label className="">Name</label>

                                        <input

                                            type="text"

                                            className="w-full px-4 py-2"

                                            label="Name"

                                            name="name"

                                            value={data.nama}

                                            onChange={(e) =>

                                                setData("nama", e.target.value)

                                            }

                                        />

                                        <span className="text-red-600">

                                            {errors.nama}

                                        </span>

                                    </div>

                                    <div className="mb-0">

                                        <label className="">Parent</label>

                                        <textarea

                                            type="text"

                                            className="w-full rounded"

                                            label="parent_id"

                                            name="parent_id"

                                            errors={errors.parent_id}

                                            value={data.parent_id}

                                            onChange={(e) =>

                                                setData("parent_id", e.target.value)

                                            }

                                        />

                                        <span className="text-red-600">

                                            {errors.parent_id}

                                        </span>

                                    </div>

                                </div>

                                <div className="mt-4">

                                    <button

                                        type="submit"

                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"

                                    >

                                        Update

                                    </button>

                                </div>

                            </form>



                        </div>

                    </div>

                </div>

            </div>

        </Authenticated>

    );

}
