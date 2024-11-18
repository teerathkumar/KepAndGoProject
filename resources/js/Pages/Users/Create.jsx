import React from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link,usePage} from '@inertiajs/react';


export default function Dashboard(props) {


    const {roles, locations} = usePage().props;
    const {data, setData, errors, post} = useForm({
        name:"",
        email:"",
        password:"",
        phone:"",
        location:"",
        role:"",
        photo:"",
        password_confirmation:""

    });


    function handleSubmit(e) {

        e.preventDefault();

        post(route("users.store"));

    }


    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}

        >

            <Head title="Users"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Add User</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("users.index")}

                            >

                                Back

                            </Link>

                        </div>


                        <form name="createForm" onSubmit={handleSubmit}>

                            <div className="flex flex-col">
                                <div className="mb-2">
                                    <label htmlFor="formFile" className="form-label">Profile Picture</label>

                                    <input

                                        type="file"
                                        id="formFile"
                                        className=" form-control w-full rounded"

                                        label="photo"

                                        name="photo"

                                        onChange={(e) =>

                                            setData("photo", e.target.files[0])

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.photo}

                                        </span>

                                </div>
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
                                <div className="mb-2">

                                    <label className="">Email</label>

                                    <input

                                        type="email"

                                        className="w-full rounded"

                                        label="email"

                                        name="email"

                                        value={data.email}

                                        onChange={(e) =>

                                            setData("email", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.email}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Phone</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="phone"

                                        name="phone"

                                        value={data.phone}

                                        onChange={(e) =>

                                            setData("phone", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.phone}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Password</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"

                                        label="password"

                                        name="password"

                                        value={data.password}

                                        onChange={(e) =>

                                            setData("password", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.password}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Confirm Password</label>

                                    <input

                                        type="text"

                                        className="w-full rounded"
                                        name="password_confirmation"

                                        label="password_confirmation"

                                        value={data.password_confirmation}

                                        onChange={(e) =>

                                            setData("password_confirmation", e.target.value)

                                        }

                                    />

                                    <span className="text-red-600">

                                            {errors.password_confirmation}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Location</label>

                                    <select className="w-full rounded" label="location"

                                            name="role"

                                            errors={errors.location}

                                            value={data.location}

                                            onChange={(e) =>

                                                setData("location", e.target.value)

                                            }>
                                        <option value="0">No location</option>
                                        {
                                            locations.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    <span className="text-red-600">

                                            {errors.location}

                                        </span>

                                </div>
                                <div className="mb-2">

                                    <label className="">Role</label>

                                    <select className="w-full rounded select2" label="roles"

                                            name="role"
                                            errors={errors.role}

                                            onChange={(e) =>

                                                setData("role", e.target.value)

                                            }>
                                        <option value={""}>no role</option>
                                        {
                                            roles.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.id}>{val.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    <span className="text-red-600">

                                            {errors.role}

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
