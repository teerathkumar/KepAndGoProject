import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link, usePage} from '@inertiajs/react';
import { useParams } from 'react-router';

export default function Dashboard(props) {

    const params = useParams();
    const {customers} = usePage().props
    const {data, setData, errors, post} = useForm({
        file_name: "",
        description: "",
        is_folder: "1",
        parent_id:params.id
    });


    function handleSubmit(e) {
        e.preventDefault();
        setData("is_folder","1");
        setData("parent_id","0");
        post(route("documents.store"));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Folder</h2>}

        >

            <Head title="Documents"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Add File</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("documents.gallery.files",[params.id])}

                            >

                                Back

                            </Link>

                        </div>


                        <form name="createForm" onSubmit={handleSubmit}>
                            <input type={"hidden"} value={data.is_folder} name={"is_folder"} />
                            <input type={"hidden"} value={data.parent_id} name={"parent_id"} />
                            <div className="flex flex-col">

                                <div className="mb-2">
                                    <label className="">File Name</label>
                                    <input
                                        type="text"
                                        className="w-full rounded"
                                        label="Name"
                                        name="file_name"
                                        value={data.file_name}
                                        onChange={(e) =>
                                            setData("file_name", e.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                            {errors.file_name}
                                        </span>
                                </div>
                                <div className="mb-2">
                                    <label className="">Description</label>
                                    <input
                                        type="text"
                                        className="w-full rounded"
                                        label="Description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="btn bg-gradient-primary btn-sm mb-5 me-2"
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
