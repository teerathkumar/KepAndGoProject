import ApplicationLogo from '@/Components/ApplicationLogo';
import Navigation from "@/Components/Theme/nav.jsx";
import Sidebar from "@/Components/Theme/sidebar.jsx"
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import {useEffect, useState} from 'react';

export default function AuthenticatedLayout({header, children}) {
    // const user = usePage().props.auth.user;
    const {message} = usePage().props
    useEffect(() => {
        hideMessage();
    }, []);
    function hideMessage(){
        console.log("Test Hide");
        setTimeout(()=>{
            console.log("Test Hide after 4 seconds");
            $("#myAlertMsg").fadeOut(500)
        },4000);
    }
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(true);
    return (

        <div className="min-h-screen bg-gray-100">
            {message && (
                <div id={"myAlertMsg"} className="alert position-fixed bg-success rounded right-3 text-sm py-2 px-4 mt-3 alert-dismissible fade show w-lg-25" role="alert" style={{zIndex: "1111"}}>
                    {message}
                </div>
                //         <div x-data="{ show: true}"
                //         x-init="setTimeout(() => show = false, 4000)"
                //         x-show="show"
                //         className="position-fixed bg-success rounded right-3 text-sm py-2 px-4 mt-3"
                //         style={{zIndex: "1111"}}>
                //     <p className="m-0">{success}</p>
                // </div>
            )
            }
            <Sidebar/>

    <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navigation page={route().current()}/>

        <div className="container-fluid py-4">

            {children}
                </div>
            </main>
        </div>
    );
}
