import Sidebar from "./components/Sidebar";

export function Layout() {
    return (

        <div className='app-container flex flex-col-reverse md:flex-row lg:flex-row h-screen w-screen overflow-hidden'>
            <Sidebar style='bg-background-surface lg:flex-1' />
            <div className='main lg:flex-7'>
            </div>
        </div>
    )
}