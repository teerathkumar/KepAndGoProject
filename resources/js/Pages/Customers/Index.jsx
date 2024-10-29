import React, { useCallback, useState } from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import { Inertia } from "@inertiajs/inertia";


import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard(props) {

    const { customers } = usePage().props

    function destroy(e) {

        if (confirm("Are you sure you want to delete this customer?")) {

            Inertia.delete(route("customers.destroy", e.currentTarget.id));

        }

    }



    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customers</h2>}

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

                                    className="btn bg-gradient-primary btn-sm mb-0"  type="button"

                                    href={route("customers.create")}

                                >

                                    +&nbsp; Create Customer

                                </Link>
                            </div>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            ID
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            Photo
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            Name
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            Email
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            Phone
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            Creation Date
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {customers.map((val, index) => (

                                        <tr key={index}>

                                            <td className="ps-4">
                                                <p className="text-xs font-weight-bold mb-0">{val.id}</p>

                                            </td>
                                            <td className="ps-4">
                                                <div>
                                                    <img src="../assets/img/team-2.jpg"
                                                         className="avatar avatar-sm me-3"/>
                                                </div>
                                            </td>
                                            <td className="ps-4">
                                                <p className="text-xs font-weight-bold mb-0">{val.name}</p>
                                            </td>

                                            <td className="ps-4">
                                                <p className="text-xs font-weight-bold mb-0">{val.phone}</p>
                                            </td>
                                            <td className="ps-4">
                                                <p className="text-xs font-weight-bold mb-0">{val.email}</p>
                                            </td>
                                            <td className="ps-4">
                                                <p className="text-xs font-weight-bold mb-0">{val.email}</p>
                                            </td>
                                            <td>
                                                <Link

                                                    tabIndex="1"

                                                    className="mx-3"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-original-title="Edit user"

                                                    href={route("customers.edit", val.id)}

                                                >
                                                    <i className="fas fa-user-edit text-secondary"></i>
                                                </Link>


                                                <button

                                                    onClick={destroy}

                                                    id={val.id}

                                                    tabIndex="-1"

                                                    type="button"


                                                >

                                                    <i className="cursor-pointer fas fa-trash text-secondary"></i>

                                                </button>

                                            </td>

                                        </tr>

                                    ))}


                                    {customers.length === 0 && (

                                        <tr>

                                            <td colSpan="6">

                                                <p className="text-xs font-weight-bold mb-0">No customers found.</p>

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
