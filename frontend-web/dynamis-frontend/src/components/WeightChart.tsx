import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface WeightEntry {
    date: string;
    weight: number;
}

export default function WeightChart({ entries = [] }: { entries?: WeightEntry[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current || entries.length === 0) return;
        const sorted = [...entries].sort((a, b) => +new Date(a.date) - +new Date(b.date));
        const chart = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels: sorted.map((e) => e.date),
                datasets: [{ data: sorted.map((e) => e.weight), showLine: sorted.length > 1 }],
            },
        });
        return () => chart.destroy();
    }, [entries]);

    if (entries.length === 0) return <div>No entries yet</div>;
    return <canvas ref={canvasRef} />;
}