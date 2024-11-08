import React, {useCallback, useEffect, useState} from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import {Inertia} from "@inertiajs/inertia";
import {Head, usePage, Link, useForm} from '@inertiajs/react';
import Modal from '@/Components/Modal.jsx';
export default function (props) {

    // const params = useParams();
    const {documents} = usePage().props

    function destroy(e) {

        if (confirm("Are you sure you want to delete this document?")) {

            Inertia.delete(route("documents.destroy", e.currentTarget.id));

        }

    }

    useEffect(() => {
        console.log(props.params);
    }, []);

    function getFiles(){

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Documents</h2>}

        >
            <Head title="Documents"/>

            <div className="col-12">
                {props.params}
                <div className="container">
                    <div className="row">
                        <h2 className="me-3 mb-4 text-xl">{documents.customer.name}'s folder: <strong>{documents.file_name} </strong></h2>
                        <div className="card">
                            <div className="card-body">

                                <div className="row mb-3">
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="search-box mb-2 me-2">
                                            <div className="position-relative">
                                                <input type="text"
                                                       className="form-control bg-light border-light rounded"
                                                       placeholder="Search..."/>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
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
                                        <div className="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                                            <div className="mb-2 me-2">
                                                <Link
                                                    className="mb-0 me-2"
                                                    href={route("documents.gallery.files.create",[1])}
                                                >
                                                    <i className="bx bxs-file-plus h1 mb-0 text-primary"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    {
                                        documents.children.map((val, index) => (


                                            <div className="col-xl-2 col-sm-6" key={index}>
                                                <div className="card shadow-none border">
                                                    <div className="card-body p-3">
                                                        <div className="">
                                                            <div
                                                                className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <i className="bx bxs-folder-open h1 mb-0 text-primary"></i>
                                                                </div>
                                                                <div className="align-self-start float-right">
                                                                    <i className="fa fa-trash text-danger"></i>

                                                                </div>
                                                            </div>
                                                            <div className="d-flex mt-3">
                                                                <div className="overflow-hidden me-auto">
                                                                    <h5 className="font-size-15 text-truncate"><a
                                                                        href="javascript: void(0);"
                                                                        className="text-body">{val.file_name}</a></h5>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))

                                        // if(documents.children.length)
                                    }
                                    {documents.children.length === 0 && (

                                        <div className="col-xl-12 col-sm-6 text-center">

                                            <p className="text-xs font-weight-bold mb-0">No files found.</p>
                                        </div>

                                    )}

                                </div>


                                {/*<div className="table-responsive p-0">*/}
                                {/*    <table className="table table-nowrap table-hover mb-0">*/}
                                {/*        <thead>*/}
                                {/*        <tr>*/}
                                {/*            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Name</th>*/}
                                {/*            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Date*/}
                                {/*                modified*/}
                                {/*            </th>*/}
                                {/*            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Size</th>*/}
                                {/*            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"*/}
                                {/*                colSpan="2">Members*/}
                                {/*            </th>*/}
                                {/*        </tr>*/}
                                {/*        </thead>*/}
                                {/*        <tbody>*/}
                                {/*        <tr>*/}
                                {/*            <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                className="mdi mdi-file-document font-size-16 align-middle text-primary me-2"></i>*/}
                                {/*                index.html</a></td>*/}
                                {/*            <td>12-10-2020, 09:45</td>*/}
                                {/*            <td>09 KB</td>*/}
                                {/*            <td>*/}
                                {/*                <div className="avatar-group">*/}
                                {/*                    <div className="avatar-group-item">*/}
                                {/*                        <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                            <img*/}
                                {/*                                src="https://bootdey.com/img/Content/avatar/avatar6.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <div className="avatar-sm">*/}
                                {/*                    <span*/}
                                {/*                        className="avatar-title rounded-circle bg-success text-white font-size-16">*/}
                                {/*                        A*/}
                                {/*                    </span>*/}
                                {/*                                </div>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-folder-zip font-size-16 align-middle text-warning me-2"></i>*/}
                                {/*                    Project-A.zip</a></td>*/}
                                {/*                <td>11-10-2020, 17:05</td>*/}
                                {/*                <td>115 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-image font-size-16 align-middle text-muted me-2"></i> Img-1.jpeg</a>*/}
                                {/*                </td>*/}
                                {/*                <td>11-10-2020, 13:26</td>*/}
                                {/*                <td>86 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <div className="avatar-sm">*/}
                                {/*                    <span*/}
                                {/*                        className="avatar-title rounded-circle bg-info text-white font-size-16">*/}
                                {/*                        K*/}
                                {/*                    </span>*/}
                                {/*                                </div>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-text-box font-size-16 align-middle text-muted me-2"></i> update*/}
                                {/*                    list.txt</a></td>*/}
                                {/*                <td>10-10-2020, 11:32</td>*/}
                                {/*                <td>08 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar4.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-folder font-size-16 align-middle text-warning me-2"></i> Project*/}
                                {/*                    B</a></td>*/}
                                {/*                <td>10-10-2020, 10:51</td>*/}
                                {/*                <td>72 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <div className="avatar-sm">*/}
                                {/*                    <span*/}
                                {/*                        className="avatar-title rounded-circle bg-danger text-white font-size-16">*/}
                                {/*                        3+*/}
                                {/*                    </span>*/}
                                {/*                                </div>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-text-box font-size-16 align-middle text-muted me-2"></i> Changes*/}
                                {/*                    list.txt</a></td>*/}
                                {/*                <td>09-10-2020, 17:05</td>*/}
                                {/*                <td>07 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar4.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar6.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-image font-size-16 align-middle text-success me-2"></i> Img-2.png</a>*/}
                                {/*                </td>*/}
                                {/*                <td>09-10-2020, 15:12</td>*/}
                                {/*                <td>31 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <div className="avatar-sm">*/}
                                {/*                    <span*/}
                                {/*                        className="avatar-title rounded-circle bg-pink text-white font-size-16">*/}
                                {/*                        L*/}
                                {/*                    </span>*/}
                                {/*                                </div>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="mdi mdi-folder font-size-16 align-middle text-warning me-2"></i> Project*/}
                                {/*                    C</a></td>*/}
                                {/*                <td>09-10-2020, 10:11</td>*/}
                                {/*                <td>20 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar4.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <div className="avatar-sm">*/}
                                {/*                    <span*/}
                                {/*                        className="avatar-title rounded-circle bg-success text-white font-size-16">*/}
                                {/*                        A*/}
                                {/*                    </span>*/}
                                {/*                                </div>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td><a href="javascript: void(0);" className="text-dark fw-medium"><i*/}
                                {/*                    className="bx bxs-file font-size-16 align-middle text-primary me-2"></i>*/}
                                {/*                    starter-page.html</a></td>*/}
                                {/*                <td>08-10-2020, 03:22</td>*/}
                                {/*                <td>11 KB</td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="avatar-group">*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar8.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                        <div className="avatar-group-item">*/}
                                {/*                            <a href="javascript: void(0);" className="d-inline-block">*/}
                                {/*                                <img*/}
                                {/*                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"*/}
                                {/*                                    alt=""*/}
                                {/*                                    className="rounded-circle avatar-sm"/>*/}
                                {/*                            </a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*                <td>*/}
                                {/*                    <div className="dropdown">*/}
                                {/*                        <a className="font-size-16 text-muted" role="button"*/}
                                {/*                           data-bs-toggle="dropdown"*/}
                                {/*                           aria-haspopup="true">*/}
                                {/*                            <i className="mdi mdi-dots-horizontal"></i>*/}
                                {/*                        </a>*/}

                                {/*                        <div className="dropdown-menu dropdown-menu-end">*/}
                                {/*                            <a className="dropdown-item" href="#">Open</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                {/*                            <a className="dropdown-item" href="#">Rename</a>*/}
                                {/*                            <div className="dropdown-divider"></div>*/}
                                {/*                            <a className="dropdown-item" href="#">Remove</a>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </td>*/}
                                {/*            </tr>*/}
                                {/*            </tbody>*/}
                                {/*        </table>*/}
                                {/*</div>*/}

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </Authenticated>
    )
}
