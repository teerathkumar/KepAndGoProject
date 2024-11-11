import React, {useCallback, useState, useEffect} from 'react';

// import Authenticated from '@/Layouts/Authenticated';

import Authenticated from '@/Layouts/AuthenticatedLayout.jsx'

import {Inertia} from "@inertiajs/inertia";

import {Head, usePage, Link, useForm} from '@inertiajs/react';
import Modal from '@/Components/Modal.jsx';

export default function (props) {
    const base_url = import.meta.env.VITE_API_URL;
    const {documents: initialDocuments, customer_id} = usePage().props

    const [documents, setDocuments] = useState(initialDocuments); // Initialize state with menus
    function searchData(val){
        axios.get(`/documents/search/${customer_id}/${val}`)
            .then(response => {
                console.log(response.data);
                setDocuments(response.data);
                $(".icon-global").addClass("bxs-folder").removeClass("bxs-folder-open");
                setFiles([])
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

        if (confirm("Are you sure you want to delete this document?")) {

            Inertia.delete(route("documents.destroy", e.currentTarget.id));

        }

    }

    const [files, setFiles] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(false);

    function getIcon(type) {
        switch (type) {
            case "pdf":
                return "bxs-file-pdf";
            case "doc":
            case "docx":
                return "bxs-file-doc";
            case "xls":
            case "xlxs":
            case "csv":
                return "bxs-spreadsheet";
            case "jpg":
            case "gif":
            case "png":
                return "bxs-file-image";
            case "txt":
                return "bxs-file-txt";
        }
    }

    function hello(id, e = null) {
        // console.log(id);
        if (e != null) {
            e.preventDefault();
        }
        // setSele
        $(".icon-global").addClass("bxs-folder").removeClass("bxs-folder-open");
        $("#icon-" + id).addClass("bxs-folder-open").removeClass("bxs-folder");

        $('.folder-name').children("a").removeClass('fw-bold text-decoration-underline');
        $('#folder-name-' + id).addClass('fw-bold text-decoration-underline');
        axios.get(`/documents/getfiles/${id}`)
            .then(response => {
                console.log(response.data);
                setFiles(response.data);
                setSelectedFolder(id);
                // Handle the response data here
            })
            .catch(error => {
                console.error(error);
                // Handle any errors here
            });
    }

    const [file_name, setFileName] = useState();
    const [file_desc, setFileDesc] = useState();
    const [uploadfile, setUploadFile] = useState(null);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        console.log("File has been set.")
    }, [uploadfile]);

    function setData(key, value) {
        if (key == "file_name")
            setFileName(value);
        if (key == "file_desc")
            setFileDesc(value);
        if (key == "uploadFile") {
            // event.currentTarget.files[0]
            setUploadFile(value.target.files[0]);
            // event.target.files[0];
        }

    }

    function handleSubmit(e) {
        // console.log(id);
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('file_name', file_name);
        bodyFormData.append('description', file_desc);
        bodyFormData.append('uploadfile', uploadfile);
        bodyFormData.append('is_folder', "0");
        bodyFormData.append('parent_id', selectedFolder);
        bodyFormData.append('customer_id', customer_id);
        axios({
            method: "post",
            url: "/documents/createfile",
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then(function (response) {
                //handle success
                console.log(response);
                if (response.status == 200) {
                    $("#exampleModal").modal('toggle');//.fadeOut();
                    hello(selectedFolder);
                } else {
                    alert("something went wrong");
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }
    const [showImage, setShowImage] = useState();
    function fnShowImage(val){
        setShowImage(val);
        $("#imageViewerModal").modal('toggle');
    }

    function downloadFile(id, file_name, file_type){
        axios({
            url: '/documents/download/'+id, //your url
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', file_name+"."+file_type); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }

    return (

        <Authenticated

            auth={props.auth}

            errors={props.errors}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Documents</h2>}

        >
            <Head title="Documents"/>
            <div className="modal fade" id="imageViewerModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/*<img src={showImage} className="img-fluid" alt="Responsive image"/>*/}
                        <embed src={showImage} alt="Responsive image" />
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add File</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="col-12">

                                    <div className="flex flex-col">

                                        <div className="mb-2">
                                            <label className="">File Name</label>
                                            <input
                                                type="text"
                                                className="w-full rounded"
                                                label="Name"
                                                name="file_name"
                                                value={file_name}
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
                                                value={file_desc}
                                                onChange={(e) =>

                                                    setData("file_desc", e.target.value)
                                                }
                                            />
                                            <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                        </div>
                                        <div className="mb-2">
                                            <label className="">File Upload</label>
                                            <input
                                                type="file"
                                                className="w-full rounded"
                                                label="File"
                                                name="file"
                                                onChange={(e) =>
                                                    // setData("uploadFile",e)
                                                    setUploadFile(e.target.files[0])
                                                }
                                            />
                                            <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="container">
                    <div className="row">
                        <h2 className="me-3 mb-4">Files & Folders of <strong>{documents.name}</strong></h2>
                        <div className="card">
                            <div className="card-body">

                                <div className="row mb-3">
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="search-box mb-2 me-2">
                                            <div className="position-relative">
                                                <input type="text"
                                                       onChange={(e)=>searchData(e.target.value)}
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
                                                    className="mb-0 me-2"
                                                    href={route("documents.create", [customer_id])}
                                                >
                                                    <i className="bx bxs-folder-plus h1 mb-0 text-primary"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row mt-4">
                                    {
                                        documents.documents?.map((val, index) => (


                                            <div className="col-xl-2 col-sm-6 mb-2" key={index}>


                                                <div className="card shadow-none border">
                                                    <div className="card-body p-3">
                                                        <div className="">
                                                            <div
                                                                className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <i className="bx bxs-folder h1 mb-0 text-primary icon-global"
                                                                       id={"icon-" + val.id}></i>
                                                                </div>
                                                                <div
                                                                    className="align-self-start float-right">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            className="dropdown-toggle"
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false">
                                                                        </button>
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <button
                                                                                    className="dropdown-item"
                                                                                    type="button">Delete
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="d-flex mt-1">
                                                                <div className="overflow-hidden me-auto">
                                                                    <Link
                                                                        onClick={(e) => hello(val.id, e)}
                                                                    >
                                                                        <h5 className="font-size-15 text-truncate folder-name">
                                                                            <a
                                                                                href="javascript: void(0);"
                                                                                className="text-body"
                                                                                id={"folder-name-" + val.id}>{val.file_name}</a>
                                                                        </h5>
                                                                    </Link>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {files?.length !== 0 && (
                <div className="col-12 mt-2">
                    <div className="container">
                        <div className="row">

                            <div className="card">
                                <div className="card-header pb-0">

                                    <div className="row">
                                        <div className="col-lg-4 col-sm-6 mt-3">
                                            <h2>Folder: <strong>{files.file_name}</strong></h2>
                                        </div>
                                        <div className="col-lg-8 col-sm-6">
                                            <div
                                                className="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                                                <div className="me-2">
                                                    <button type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal">
                                                        <i className='bx bxs-file-plus h1 text-indigo'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card-body">
                                    <div className="row mt-4">
                                        {
                                            files?.children?.map((val, index) => (


                                                <div className="col-xl-2 col-sm-6 mb-2" key={index}>
                                                    <div className="card shadow-none border">
                                                        <div className="card-body p-3">
                                                            <div className="">
                                                                <div
                                                                    className="d-flex justify-content-between align-items-start">
                                                                    <div style={{fontSize: "48px"}}>
                                                                        {/*<i className="bx bxs-file-pdf h1 mb-0 text-secondary"></i>*/}
                                                                        {
                                                                            val.file_type == "jpg" || val.file_type == "png" || val.file_type == "gif" ? (

                                                                                    <img
                                                                                        onClick={()=>fnShowImage(base_url+"/"+val.file_path)}
                                                                                        src={`${base_url}/${val.file_path}`}
                                                                                        className="rounded mx-auto d-block max-h-20 max-w-20 img-thumbnail" style={{cursor:"pointer"}}
                                                                                        id={"logo"}
                                                                                        alt="..."/>


                                                                            ) : (
                                                                                <i onClick={()=>fnShowImage(base_url+"/"+val.file_path)} className={'logo bx text-indigo ' + getIcon(val.file_type)}></i>
                                                                            )
                                                                        }


                                                                    </div>
                                                                    {/*<div className="align-self-start float-right">*/}
                                                                    {/*    <i className="fa fa-ellipsis-vertical text-danger me-1"></i>*/}
                                                                    {/*</div>*/}
                                                                    <div className="dropdown">
                                                                        <button
                                                                            className="dropdown-toggle"
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false">
                                                                        </button>
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <button
                                                                                    className="dropdown-item"
                                                                                    type="button">View
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="dropdown-item"
                                                                                    type="button">Remove
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="dropdown-item"
                                                                                    onClick={()=>downloadFile(val.id, val.file_name, val.file_type)}
                                                                                    type="button">Download
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                </div>
                                                                <div className="d-flex mt-1">
                                                                    <div
                                                                        className="overflow-hidden me-auto">
                                                                        <h5 className="font-size-15 text-truncate">
                                                                            <a
                                                                                href="javascript: void(0);"
                                                                                className="text-body">{val.file_name}</a>
                                                                        </h5>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                            // if(documents.children.length)
                                        }
                                        {files?.children?.length === 0 && (

                                            <div className="col-xl-12 col-sm-6 text-center">

                                                <p className="text-xs font-weight-bold mb-0">No files
                                                    found.</p>
                                            </div>

                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

        </Authenticated>
    )
}
