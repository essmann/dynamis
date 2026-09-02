import WeightChart, { type WeightEntry } from "../WeightChart";

export default function MeasurementsPage() {

    const sampleEntries: WeightEntry[] = [
        { date: "2026-08-19", weight: 84.2 },
        { date: "2026-08-20", weight: 84.0 },
        { date: "2026-08-21", weight: 84.1 },
        { date: "2026-08-22", weight: 83.7 },
        { date: "2026-08-23", weight: 83.9 },
        { date: "2026-08-24", weight: 83.5 },
        { date: "2026-08-25", weight: 83.6 },
        { date: "2026-08-26", weight: 83.3 },
        { date: "2026-08-27", weight: 83.4 },
        { date: "2026-08-28", weight: 83.0 },
        { date: "2026-08-29", weight: 83.1 },
        { date: "2026-08-30", weight: 82.8 },
        { date: "2026-08-31", weight: 82.7 },
        { date: "2026-09-01", weight: 82.5 },
        { date: "2026-09-02", weight: 82.4 },
        { date: "2026-09-02", weight: 92.4 },
        { date: "2026-09-02", weight: 92.4 },
        { date: "2026-09-02", weight: 92.4 },
        { date: "2026-09-02", weight: 92.4 },
        { date: "2026-09-02", weight: 92.4 },

        { date: "2026-09-02", weight: 92.4 },

        { date: "2026-09-02", weight: 92.4 },

        { date: "2026-09-02", weight: 92.4 },

    ];
    return (
        <div className="measurements flex flex-col h-full md:items-center">
            <div className="measurements-chart md:w-7xl md:justify-center align-center">
                <WeightChart entries={sampleEntries} />
            </div>

            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
                <WeightHistory entries={sampleEntries} />
            </div>
        </div>
    );
}


function WeightHistory({ entries = [] }: { entries?: WeightEntry[] }) {
    return (
        <>
            <div className=" text-text-secondary font-bold">History</div>
            <div className="weight-history
            flex
             flex-col ">
                {entries?.map((w, index) => {
                    return <WeightHistoryEntry key={`${w.date}-${index}`}
                        date={w.date} weight={w.weight} />;
                })}
            </div>
        </>
    )
}

function WeightHistoryEntry({ date, weight }: { date: string, weight: number }) {
    return (
        <div className="weight-history-entry
            flex

text-text bg-background-surface   box-border justify-between">
            <div className="">{date}</div>

            <div className="weight-unit flex items-center">
                <div className="font-bold text-xl">{weight}</div>
                <span className="text-xs mt-2 font-medium ml-1">kg</span>
            </div>

        </div>
    )
}
