import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export function Layout() {
    return (

        <div className='app-container flex flex-col-reverse 
        md:flex-row lg:flex-row h-screen w-screen '>
            <Sidebar style='bg- lg:flex-1' />
            <div className='main w-full h-full md:flex-7 md:w-auto overflow-scroll'>
                <Outlet />
            </div>
        </div>
    )
}