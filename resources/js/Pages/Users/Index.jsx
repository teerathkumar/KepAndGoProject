import React, {useCallback, useEffect, useState} from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import {Inertia} from "@inertiajs/inertia";
import moment from "moment";

import {Head, usePage, Link} from '@inertiajs/react';
import {showToast} from "@/Components/Theme/ToastContainer.jsx";

export default function (props) {

    const {users, success, error} = usePage().props
    const base_url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        if (success) {
            showToast(success, 'success');
        }
        if (error) {
            showToast(error, 'error');
        }
    }, [success, error]);

    function destroy(e) {

        if (confirm("Are you sure you want to delete this user?")) {

            Inertia.delete(route("users.destroy", e.currentTarget.id));

        }

    }

    const [formData, setFormData] = useState({status: ''});
    const handleSubmit = (e, id, status) => {
        e.preventDefault();
        const updatedFormData = { ...formData, status: !status };
        Inertia.put(route('users.updateStatus', id), updatedFormData);
    };
    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}

        >

            <Head title="Users"/>

            <div className="row">
                <div className="col-12">
                    <div className="card mb-4 mx-4">
                        <div className="card-header pb-0">
                            <div className="d-flex flex-row justify-content-between">
                                <div>
                                    <h5 className="mb-0">All Users</h5>
                                </div>
                                <div className="text-right">

                                    <Link

                                        className="btn bg-gradient-primary btn-sm mb-0 mr-2" type="button"

                                        href={route("users.create")}

                                    >

                                        +&nbsp; Create User

                                    </Link>
                                    <Link

                                        className="btn bg-gradient-secondary btn-sm mb-0" type="button"

                                        href={route("roles.index")}

                                    >

                                        User Roles & Permissions

                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center text-left mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            ID
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Photo
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Name
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Email
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Role
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Status
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Creation Date
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.data.map((val, index) => (
                                        <tr>
                                            <td className="ps-4">
                                                <p className="text-xs font-weight-bold mb-0">{val.id}</p>
                                            </td>
                                            <td>
                                                <div>
                                                    {
                                                        val.photo !== null ?
                                                            <img src={base_url + "/" + val.photo}
                                                                 className="avatar avatar-sm me-3"/>
                                                            :
                                                            <img src={base_url + "/assets/img/team-2.jpg"}
                                                                 className="avatar avatar-sm me-3"/>
                                                    }

                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{val.name}</p>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{val.email}</p>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{val.name}</p>
                                            </td>
                                            <td className="text-center">
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={(e) => handleSubmit(e, val.id, val.status)}
                                                >
                                                    {
                                                        val.status == 0 ?
                                                            <i className="fa fa-toggle-off text-secondary"></i> :
                                                            <i className="fa fa-toggle-on text-success"></i>
                                                    }
                                                </div>

                                            </td>
                                            <td>
                                                <span
                                                    className="text-secondary text-xs font-weight-bold">{moment(val.created_at).format("DD MMM YYYY")}</span>
                                            </td>
                                            <td>
                                                <Link

                                                    tabIndex="1"

                                                    className="mx-3"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-original-title="Edit user"

                                                    href={route("users.edit", val.id)}

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

                                    {users.data.length === 0 && (

                                        <tr>

                                            <td colSpan="8" align={"center"}>

                                                <p className="text-xs font-weight-bold mb-0">No users found.</p>

                                            </td>

                                        </tr>

                                    )}

                                    </tbody>
                                </table>
                                <div className="pagination mx-4"> {users.links.map((link, index) => (
                                    <Link key={index} href={link.url}
                                          className={`btn bg-gradient-secondary btn-sm mb-0 pagination-link ${link.active ? 'active' : ''}`}
                                          dangerouslySetInnerHTML={{__html: link.label}}/>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
