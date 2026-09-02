import { useState } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import BoltIcon from "@mui/icons-material/Bolt";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Sidebar({ style = "" }: { style?: string }) {
    const [activeItem, setActiveItem] = useState(0);

    const items = [
        { name: "Overview", icon: <DashboardIcon /> },
        { name: "Workouts", icon: <FitnessCenterIcon /> },
        { name: "Measurements", icon: <StraightenIcon /> },
        { name: "Exercises", icon: <BoltIcon /> },
        { name: "Settings", icon: <SettingsIcon /> },
    ];

    return (
        <aside className={`
            sidebar
            ${style}
            w-full
            md:w-64
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
                    text-primary-variant
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
                                    text-text-secondary

                                    ${active
                                        ? "bg-background-surface-hover border-primary"
                                        : "border-transparent"
                                    }

                                    hover:text-primary-variant-hover
                                `}
                            >
                                <span className="md:hidden">
                                    {item.icon}
                                </span>

                                <span className="hidden md:block">
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </nav>

            </div>
        </aside>
    );
}
