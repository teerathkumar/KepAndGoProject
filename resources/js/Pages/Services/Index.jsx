import React, {useCallback, useEffect, useState} from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import {Inertia} from "@inertiajs/inertia";
import Modal from "@/Components/Modal.jsx";
import moment from "moment";
import {Head, usePage, Link} from '@inertiajs/react';
import {showToast} from "@/Components/Theme/ToastContainer.jsx";

export default function (props) {

    const {services,success, error} = usePage().props
    useEffect(() => {
        if (success) {
            showToast(success, 'success');
        }
        if (error) {
            showToast(error, 'error');
        }
    }, [success,error]);
    function destroy(e) {

        if (confirm("Are you sure you want to delete this service?")) {

            Inertia.delete(route("services.destroy", e.currentTarget.id));

        }

    }

    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Services</h2>}

        >

            {/*<Modal children={"hello"} closeable={true} show={true}/>*/}
            <Head title="Leads"/>

            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">All Services</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("services.create")}

                            >

                                +&nbsp; Create Service

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
                                        Service Name
                                    </th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">
                                        Status
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

                                {services.data.map((val, index) => (

                                    <tr key={index}>

                                        <td className="ps-4">
                                            <p className="text-xs font-weight-bold mb-0">{val.id}</p>

                                        </td>
                                        <td className="ps-4">
                                            <p className="text-xs font-weight-bold mb-0">{val.name}</p>
                                        </td>

                                        <td className="align-middle text-center text-sm">
                                            {
                                                val.status ?
                                                    <span className="badge badge-sm bg-gradient-success">Active</span>
                                                    :
                                                    <span className="badge badge-sm bg-gradient-error">Inactive</span>
                                            }
                                        </td>
                                        <td className="align-middle text-center text-sm">
                                            <p className="text-xs font-weight-bold mb-0">{moment(val.created_at).format("DD MMM YYYY")}</p>
                                        </td>
                                        <td>
                                            <Link

                                                tabIndex="1"

                                                className="mx-3"
                                                data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit"

                                                href={route("services.edit", val.id)}

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


                                {services.data.length === 0 && (

                                    <tr>

                                        <td colSpan="8" align={"center"}>

                                            <p className="text-xs font-weight-bold mb-0">No services found.</p>

                                        </td>

                                    </tr>

                                )}


                                </tbody>
                            </table>
                            <div className="pagination mx-4"> {services.links.map((link, index) => (
                                <Link key={index} href={link.url}
                                      className={`btn bg-gradient-secondary btn-sm mb-0 pagination-link ${link.active ? 'active' : ''}`}
                                      dangerouslySetInnerHTML={{__html: link.label}}/>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Authenticated>
    )
}
