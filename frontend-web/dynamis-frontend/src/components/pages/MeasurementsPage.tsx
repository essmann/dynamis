import { useNavigate } from "react-router-dom";
import PageHeader from "../PageHeader";
import WeightChart, { type WeightEntry } from "../WeightChart";
import WeightGoalRing from "../WeightGoalPie";
import WeightGoalPie from "../WeightGoalPie";
import { useState, type ChangeEvent } from "react";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Slider from '@mui/material/Slider';
export default function MeasurementsPage() {

    const navigate = useNavigate();
    const [addWeight, setAddWeight] = useState(false);
    const [selectedTag, setSelectedTag] = useState("Weight");
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
    const onTagClick = (tagName: string) => setSelectedTag(tagName);
    return (
        <>

            {addWeight ? (
                <AddWeightPage onClose={() => setAddWeight(false)} onSubmit={() => ""} />
            ) : (
                <>
                    <PageHeader title="Measurements" onBack={() => navigate("/")} onCreate={() => setAddWeight(true)} />
                    <Tags selectedTag={selectedTag} onClick={onTagClick} />
                    <HistoryTrackingView entries={sampleEntries} /></>
            )}
        </>
    );
}
function Tags({ selectedTag, onClick }: { selectedTag: string, onClick: (str: string) => void }) {

    return (
        <div className="measurement-tags mt-2">
            <div className="text-text ml-2 flex ">
                <div className="font-bold text-2xl ">
                    <button onClick={() => onClick("Weight")} className={`${selectedTag == "Weight" ? "bg-primary" : "  bg-background-surface   opacity-50 text-text  "} 
                    p-1.5 ml-1 text-sm text-background-surface rounded-xl hover:bg-primary cursor-pointer `}>Weight</button>
                </div>
                <div className="font-bold text-2xl ">
                    <button onClick={() => onClick("Other")} className={`${selectedTag == "Other" ? "bg-primary" : "  bg-background-surface   opacity-50 text-text  "} 
                    p-1.5 ml-1 text-sm text-background-surface rounded-xl hover:bg-primary cursor-pointer `}>Other</button>
                </div>

            </div>
        </div>
    )
}
function HistoryTrackingView({ entries = [] }: { entries?: WeightEntry[] }) {
    return (
        <div>
            {/* <PageHeader title="Measurements" onBack={() => ""} onCreate={() => ""} /> */}
            <div className="measurements flex flex-col h-full md:items-center">
                <div className="measurements-chart
                 md:w-7xl md:justify-center align-center
                 mt-5">
                    <WeightChart entries={entries} />
                </div>
                {/* <div className="text-text ml-2">
                    <div className="font-bold text-2xl">
                        <span className="bg-primary rounded-md text-background-surface  
                        p-1.5 ml-1 text-sm">Weight</span>
                    </div>

                </div> */}
                <div className="flex flex-col flex-1 min-h-0 overflow-y-auto mt-8">
                    <HistoryList entries={entries} />
                </div>
                {/* <div className="absolute w-full flex">
                <button className="absolute p-3  bg-red-500 w-auto ">hi</button>
            </div> */}
            </div>
        </div>
    )
}

function HistoryList({ entries = [] }: { entries?: WeightEntry[] }) {
    return (
        <>
            <div className="ml-3 text-text-secondary font-bold ">History</div>
            <div className="weight-history
            flex
             flex-col-reverse ">
                {entries?.map((w, index) => {
                    let prev;
                    if (index < entries.length && index > 0) prev = entries[index - 1].weight;
                    return <HistoryEntry key={`${w.date}-${index}`}
                        date={w.date} weight={w.weight} prev={prev} />;
                })}
            </div>
        </>
    )
}

function HistoryEntry({ prev, date, weight }: { prev?: number, date: string, weight: number }) {
    const computeChange = () => {
        console.log(`weight: ${weight} prev: ${prev} diff: ${parseFloat(Number(weight - prev!).toFixed(2))}`)
        if (prev == 0 || prev === null) return 0;
        return parseFloat(Number(weight - prev!).toFixed(2))!;
    }
    const change = computeChange();
    return (
        <div className="weight-history-entry
            flex
            border-b-2 
         mt-1 p-3 rounded 
text-text border-background-hover    box-border justify-between">
            <div className="flex">
                <div className="">{computeRelativeDate(date)}</div>
                <span className="ml-1 *:ml-1 *:">
                    {change < 0 && <span className="text-error font-bold"> {change} </span>}
                    {change > 0 && <span className="text-success font-bold"> +{change} </span>}
                </span>
            </div>
            <div className="weight-unit flex items-center">
                <div className="font-bold text-xl">{weight}</div>
                <span className="text-xs mt-2  ml-1 text-text-secondary font-bold">kg</span>
            </div>

        </div>
    )
}

function AddWeightPage({ onClose, onSubmit }: { onClose: () => void, onSubmit: () => void }) {
    const [value, setValue] = useState(0);
    const handleChange = (event: Event, newValue: number) => {
        setValue(newValue);
    };
    const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        console.log(inputValue);
        if (inputValue === "NaN") return;
        try {
            var parsed = parseFloat(inputValue);
            setValue(parsed);
        }
        catch {
            return;
        }
    };
    return (
        <>
            <div className="w-full flex flex-col justify-center mt-3 ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker

                        sx={{
                            '.MuiDateCalendar-root': {
                                // color: '#f8bbd0',
                                // borderRadius: '4px',
                                // borderWidth: '1px',
                                // borderColor: '#e91e63',
                                // border: '1px ',
                                // backgroundColor: '#880e4f',
                            },
                            '.MuiPickersToolbar-content.css-10qtiir-MuiPickersToolbar-content': {
                                display: "flex",
                                justifyContent: "center"
                            },
                            ".MuiPickersToolbar-title": {

                                display: "none"
                            }


                        }}
                        slotProps={{
                            actionBar: {
                                actions: [], // Passes an empty array to completely hide the action bar
                            },
                        }}
                        defaultValue={dayjs('2022-04-17')} />

                </LocalizationProvider>
                <div className="w-full flex  flex-col justify-center items-center  ">
                    <div>
                        <input type="number" className="w-25 text-5xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={value}
                            onChange={(e) => handleTextInput(e)} />
                        <span>kg</span>
                    </div>
                    <Slider sx={{
                        width: "90%"
                    }} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={handleChange}
                        value={value}
                        step={0.1} />

                    <div className="flex justify-around w-full *:p-3 *:rounded-xl mt-5">
                        <button className="bg-secondary-variant w-25"
                            onClick={onClose}
                        >Cancel</button>
                        <button className="bg-success w-25 disabled:opacity-60"
                            disabled={value <= 0}>Add</button></div>
                </div>
            </div>
            <div></div>
        </>
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
