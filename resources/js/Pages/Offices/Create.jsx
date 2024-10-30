import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link, usePage} from '@inertiajs/react';



export default function Dashboard(props) {


    const { offices } = usePage().props;


    const { data, setData, errors, post } = useForm({

        name: "",

        parent_id: "",

    });



    function handleSubmit(e) {

        e.preventDefault();

        post(route("offices.store"));

    }



    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Office</h2>}

        >

            <Head title="Offices"/>

            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Add Office</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("offices.index")}

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
                                <div className="mb-0">

                                    <label className="">Parent</label>

                                    <select className="w-full rounded" label="parent_id"

                                            name="parent_id"

                                            errors={errors.parent_id}

                                            value={data.parent_id}

                                            onChange={(e) =>

                                                setData("parent_id", e.target.value)

                                            }>
                                        <option value="0">No Parent</option>
                                        {
                                            offices.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.name}</option>
                                                );
                                            })
                                        }
                                    </select>

                                    <span className="text-red-600">

                                            {errors.parent_id}

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
