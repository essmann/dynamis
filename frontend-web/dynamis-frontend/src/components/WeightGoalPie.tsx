import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function WeightGoalRing({
    current,
    goal,
    start, // starting weight, to measure progress from
}: {
    current: number;
    goal: number;
    start: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const total = Math.abs(start - goal);
        const done = Math.abs(start - current);
        const progress = total === 0 ? 1 : Math.min(done / total, 1);

        const centerText = {
            id: "centerText",
            afterDraw(chart: Chart) {
                const { ctx, chartArea } = chart;
                const x = (chartArea.left + chartArea.right) / 2;
                const y = (chartArea.top + chartArea.bottom) / 2;
                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = "bold 24px sans-serif";
                ctx.fillStyle = "#7F77DD";
                ctx.fillText(`${current} kg`, x, y);
                ctx.restore();
            },
        };

        const chart = new Chart(canvasRef.current, {
            type: "doughnut",
            data: {
                datasets: [{
                    data: [progress, 1 - progress],
                    backgroundColor: ["#7F77DD", "#2C2C2A"],
                    borderWidth: 0,
                }],
            },
            options: {
                cutout: "80%",
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
            },
            plugins: [centerText],
        });

        return () => chart.destroy();
    }, [current, goal, start]);

    return <canvas ref={canvasRef} />;
}