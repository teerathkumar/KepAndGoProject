import React, {useEffect, useState} from 'react';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

import {Head, useForm, Link, usePage} from '@inertiajs/react';


export default function Dashboard(props) {


    const {permissions, userRoles} = usePage().props
    const {data, setData, errors, post} = useForm({

        name: "",
        permissions:[]

    });



    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event) => {
        const {value, checked} = event.target;
        setSelectedValues(prevState => {
            if (checked) {
                return [...prevState, parseInt(value)];
            } else {
                return prevState.filter(val => val !== parseInt(value));
            }
        });
        console.log(selectedValues);
    }

    useEffect(() => {
        console.log(selectedValues);
        setData("permissions", selectedValues);
    }, [selectedValues]);
    function handleSubmit(e) {
        e.preventDefault();
        // setData("permissions", selectedValues);
        // setData(prevData => ({ ...prevData, permissions: selectedValues }));
        post(route("roles.store"));

    }
    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Role</h2>}

        >

            <Head title="Roles"/>


            <div className="col-12">
                <div className="card mb-4 mx-4">
                    <div className="card-header pb-0">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h5 className="mb-0">Add Role</h5>
                            </div>
                            <Link

                                className="btn bg-gradient-primary btn-sm mb-0" type="button"

                                href={route("roles.index")}

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


                            </div>
                            <div className="flex flex-col">

                                <div className="mb-2">
                                    <label htmlFor="">Permissions</label>
                                    <div className="row checkbox-group">
                                        {permissions.map((val, index) => (
                                            <div className="col-md-3" key={index} style={{textTransform: "capitalize"}}>
                                                <label className="px-2 cursor-pointer">
                                                    <input
                                                        className="mx-2 mychecboxes"
                                                        type="checkbox"
                                                        value={val.id}
                                                        id={"checkbox-" + val.id}
                                                        checked={selectedValues.includes(val.id)}
                                                        onChange={handleChange}
                                                    />
                                                    {val.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
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
