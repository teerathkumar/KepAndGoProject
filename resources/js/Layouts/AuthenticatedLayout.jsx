import ApplicationLogo from '@/Components/ApplicationLogo';
import Navigation from "@/Components/Theme/nav.jsx";
import Sidebar from "@/Components/Theme/sidebar.jsx"
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import {useEffect, useState} from 'react';
import { showToast } from '@/Components/Theme/ToastContainer.jsx';
export default function AuthenticatedLayout({header, children}) {



    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(true);
    return (

        <div className="min-h-screen bg-gray-100">

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
