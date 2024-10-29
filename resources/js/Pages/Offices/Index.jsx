import React, { useCallback, useState } from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import { Inertia } from "@inertiajs/inertia";


import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard(props) {

    const { offices } = usePage().props

    function destroy(e) {

        if (confirm("Are you sure you want to delete this office?")) {

            Inertia.delete(route("offices.destroy", e.currentTarget.id));

        }

    }



    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Offices</h2>}

        >

            <Head title="Offices" />


            <div className="row">


                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">


                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-2">

                                <Link

                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"

                                    href={route("offices.create")}

                                >

                                    Create Office

                                </Link>

                            </div>


                            <table className="table-responsive w-full">

                                <thead>

                                <tr className="bg-gray-100">

                                    <th className="px-4 py-2 w-20">No.</th>

                                    <th className="px-4 py-2">Name</th>

                                    <th className="px-4 py-2">Parent</th>

                                    <th className="px-4 py-2">Action</th>

                                </tr>

                                </thead>

                                <tbody>

                                {offices.map((val, index) => (

                                    <tr key={index}>

                                        <td className="border px-4 py-2">{val.id}</td>

                                        <td className="border px-4 py-2">{val.name}</td>

                                        <td className="border px-4 py-2">{val.parent_id ? val.parent.name : "No Parent"}</td>

                                        <td className="border px-4 py-2">

                                            <Link

                                                tabIndex="1"

                                                className="px-4 py-2 text-sm text-white bg-blue-500 rounded"

                                                href={route("offices.edit", val.id)}

                                            >

                                                Edit

                                            </Link>

                                            <button

                                                onClick={destroy}

                                                id={val.id}

                                                tabIndex="-1"

                                                type="button"

                                                className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))}


                                {offices.length === 0 && (

                                    <tr>

                                        <td

                                            className="px-6 py-4 border-t"

                                            colSpan="4"

                                        >

                                            No Offices found.

                                        </td>

                                    </tr>

                                )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>


        </Authenticated>

    );

}
