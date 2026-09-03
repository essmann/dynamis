import PageHeader from "../PageHeader";
import WeightChart, { type WeightEntry } from "../WeightChart";
import WeightGoalRing from "../WeightGoalPie";
import WeightGoalPie from "../WeightGoalPie";

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


    ];
    return (
        <div>
            <PageHeader title="Measurements" onBack={() => ""} onCreate={() => ""} />
            <div className="measurements flex flex-col h-full md:items-center">
                <div className="measurements-chart
                 md:w-7xl md:justify-center align-center
                 mt-5">
                    <WeightChart entries={sampleEntries} />
                </div>
                <div className="text-text ml-2">
                    <div className="font-bold text-2xl">
                        <span className="bg-primary rounded-md text-background-surface  
                        p-1.5 ml-1 text-sm">Weight</span>
                    </div>

                </div>
                <div className="flex flex-col flex-1 min-h-0 overflow-y-auto mt-8">
                    <WeightHistory entries={sampleEntries} />
                </div>
                {/* <div className="absolute w-full flex">
                <button className="absolute p-3  bg-red-500 w-auto ">hi</button>
            </div> */}
            </div>
        </div>
    );
}


function WeightHistory({ entries = [] }: { entries?: WeightEntry[] }) {
    return (
        <>
            <div className="ml-3 text-text-secondary font-bold ">History</div>
            <div className="weight-history
            flex
             flex-col-reverse ">
                {entries?.map((w, index) => {
                    return <WeightHistoryEntry key={`${w.date}-${index}`}
                        date={w.date} weight={w.weight} />;
                })}
            </div>
        </>
    )
}

function WeightHistoryEntry({ prev, date, weight }: { prev?: number, date: string, weight: number }) {
    return (
        <div className="weight-history-entry
            flex
            border-b-2 
         mt-1 p-3 rounded 
text-text border-background-hover    box-border justify-between">
            <div className="">{computeRelativeDate(date)}</div>

            <div className="weight-unit flex items-center">
                <div className="font-bold text-xl">{weight}</div>
                <span className="text-xs mt-2  ml-1 text-text-secondary font-bold">kg</span>
            </div>

        </div>
    )
}

//Gets day of the week if it was less than one week ago, the string date otherwise.
const computeRelativeDate = (date: string): string => {
    const dateEpoch = Math.floor(Date.parse(date) / 1000);
    const nowEpoch = Math.floor(Date.now() / 1000);
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(dateEpoch * 1000).getDay();
    return dateEpoch <= nowEpoch && dateEpoch >= (nowEpoch - oneWeekInSeconds) ? daysOfWeek[day] : date;


}
