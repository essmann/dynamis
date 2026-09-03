import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export function Layout() {
    return (
        <div className="h-dvh w-full overflow-hidden flex flex-col-reverse md:flex-row">
            <Sidebar />

            <main className="min-h-0 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
