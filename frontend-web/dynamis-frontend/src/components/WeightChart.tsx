import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface WeightEntry {
    date: string;
    weight: number;
}

export default function WeightChart({ entries = [] }: { entries?: WeightEntry[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rootElement = document.documentElement; // This targets :root

    // 2. Get the computed styles for that element
    const computedStyles = window.getComputedStyle(rootElement);

    // 3. Read the variable value using its exact string name
    const primaryColor = computedStyles.getPropertyValue('--color-primary').trim();
    useEffect(() => {
        if (!canvasRef.current) return;
        const hasData = entries.length > 0;
        const sorted = [...entries].sort((a, b) => +new Date(a.date) - +new Date(b.date));

        const chart = new Chart(canvasRef.current, {
            type: "line",
            data: hasData
                ? {
                    labels: sorted.map((e) => new Date(e.date).toLocaleDateString(undefined, { month: "short" })),
                    datasets: [{
                        label: "Weight",
                        data: sorted.map((e) => e.weight),
                        showLine: sorted.length > 1,
                        borderColor: primaryColor,
                    }],
                }
                : {
                    labels: ["", ""],
                    datasets: [{
                        label: "nodata",
                        data: [0, 0],
                        showLine: true,
                        borderColor: primaryColor,
                        pointRadius: 0,
                    }],
                },

            options: {
                plugins: { legend: { display: true } },
            },
        });
        return () => chart.destroy();
    }, [entries]);

    return <canvas ref={canvasRef} />;
}