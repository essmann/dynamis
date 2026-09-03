import { useEffect, useState } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import BoltIcon from "@mui/icons-material/Bolt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar({ style = "" }: { style?: string }) {
    const [activeItem, setActiveItem] = useState(0);
    const location = useLocation();

    const items = [
        { name: "Overview", icon: <DashboardIcon />, href: "/" },
        { name: "Workouts", icon: <FitnessCenterIcon />, href: "/workouts" },
        { name: "Measurements", icon: <StraightenIcon />, href: "/measurements" },
        { name: "Exercises", icon: <BoltIcon />, href: "/exercises" },
        { name: "Settings", icon: <SettingsIcon />, href: "/settings" },
    ];

    useEffect(() => {
        // runs every time the pathname changes
        const matched = items.findIndex((el) => el.href == location.pathname)
        setActiveItem(matched || 0);
    }, [location.pathname]);
    return (
        <aside className={`
      sidebar
      ${style}
      w-full
      md:w-64
      bg-background-surface
    `}>
            <div className="
        flex
        flex-row
        md:flex-col
      ">

                <div className="
          hidden
          md:block
          ml-3
          mt-2
          mb-5
          text-2xl
          font-bold
          text-primary
        ">
                    Dynamis
                </div>

                <nav className="
          flex
          w-full
          justify-between
          md:flex-col
          md:justify-start
        ">
                    {items.map((item, index) => {
                        const active = activeItem === index;

                        return (
                            <Link to={item.href}>
                                <button
                                    key={item.name}
                                    onClick={() => setActiveItem(index)}
                                    className={`
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  md:items-start
                  gap-1
                  md:gap-3
                  p-3
                  w-15
                  md:w-auto
                  md:border-l-3
                  transition-colors
                  text-text
                  hover:bg-background-surface-hover

                  ${active
                                            ? "bg-primary/10 border-primary text-primary border-b-3 md:border-b-0"
                                            : "border-transparent"
                                        }

                  hover:text-h-hover
                `}
                                >
                                    <span className="md:hidden ">
                                        {item.icon}
                                    </span>

                                    <span className="hidden md:block ">
                                        {item.name}
                                    </span>
                                </button></Link>
                        );
                    })}
                </nav>

            </div>
        </aside>
    );
}