import React, {useCallback, useEffect, useState} from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import { Inertia } from "@inertiajs/inertia";


import { Head, usePage, Link } from '@inertiajs/react';
import moment from "moment/moment.js";
import {showToast} from "@/Components/Theme/ToastContainer.jsx";

export default function Dashboard(props) {

    const { customers:initialDocuments, success, error } = usePage().props
    useEffect(() => {
        if (success) {
            showToast(success, 'success');
        }
        if (error) {
            showToast(error, 'error');
        }
    }, [success,error]);
    const [customers, setCustomers] = useState(initialDocuments); // Initialize state with menus
    function searchData(val){
        if(val==""){
            val = "null";
        }
        axios.get(`/customers/search/${val}`)
            .then(response => {
                console.log(response.data);
                setCustomers(response.data);
                // setFiles(response.data);
                // setSelectedFolder(id);
                // Handle the response data here
            })
            .catch(error => {
                console.error(error);
                // Handle any errors here
            });
    }
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
                            <div className="row mb-3">
                                <div className="col-lg-4 col-sm-6">
                                    <div className="search-box mb-2 me-2">
                                        <div className="position-relative">
                                            <input type="text"
                                                   onChange={(e) => searchData(e.target.value)}
                                                   className="form-control bg-light border-light rounded"
                                                   placeholder="Search..."/>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26"
                                                 height="26"
                                                 viewBox="0 0 24 24"
                                                 className="eva eva-search-outline search-icon">
                                                <g data-name="Layer 2">
                                                    <g data-name="search">
                                                        <rect width="24" height="24" opacity="0"></rect>
                                                        <path
                                                            d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-6">
                                    <div
                                        className="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                                        <div className="mb-2 me-2">
                                            <Link

                                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                                href={route("customers.create")}

                                            >

                                                +&nbsp; Create Customer

                                            </Link>
                                        </div>
                                    </div>
                                </div>
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

                                            {customers.data.map((val, index) => (

                                                <tr key={index}>

                                                    <td className="ps-4">
                                                        <p className="text-xs font-weight-bold mb-0">{val.id}</p>

                                                    </td>
                                                    <td className="ps-4">
                                                        <div>
                                                            <img src="./assets/img/team-2.jpg"
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
                                                        <p className="text-xs font-weight-bold mb-0">{moment(val.created_at).format("DD MMM YYYY")}</p>
                                                    </td>
                                                    <td>
                                                        <Link

                                                            tabIndex="2"

                                                            className="mx-3"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-original-title="Edit user"

                                                            href={route("documents.gallery", [val.id])}

                                                        >
                                                            <i className="fa fa-folder-open	 text-secondary"></i>
                                                        </Link>
                                                        <Link

                                                            tabIndex="1"

                                                            className="me-3"
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


                                            {customers.data.length === 0 && (

                                                <tr>

                                                    <td colSpan="6">

                                                        <p className="text-xs font-weight-bold mb-0">No customers
                                                            found.</p>

                                                    </td>

                                                </tr>

                                            )}


                                            </tbody>
                                        </table>
                                        <div className="pagination mx-4"> {customers.links.map((link, index) => (
                                            <Link key={index} href={link.url}
                                                  className={`btn bg-gradient-secondary btn-sm mb-0 pagination-link ${link.active ? 'active' : ''}`}
                                                  dangerouslySetInnerHTML={{__html: link.label}}/>))}
                                        </div>
                                    </div>
                                </div>
                    </div>
                </div>


        </Authenticated>

    );

}
