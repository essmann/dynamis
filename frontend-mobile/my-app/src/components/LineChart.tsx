import { LineChart } from "react-native-gifted-charts";
import { HistoryEntry, sharedStyles } from "@dynamis/shared";
import { View } from "react-native";
import { useState } from "react";

export default function Chart({ values }: { values: HistoryEntry[] }) {
    const [width, setWidth] = useState(0);

    const horizontalPadding = 4;
    const chartWidth = Math.max(0, width - horizontalPadding * 2);

    // 1. Find the highest and lowest weight entries safely
    const rawLowest = values.length > 0 ? Math.min(...values.map(v => v.value)) : 0;
    const rawHighest = values.length > 0 ? Math.max(...values.map(v => v.value)) : 100;

    // 2. Base baseline offset
    const yAxisOffset = Math.floor(rawLowest - 2);

    // 3. Keep the number of grid sections small
    const noOfSections = 5;

    // 4. Calculate an incremental step value 
    const rawRange = rawHighest - yAxisOffset;
    const stepValue = Math.ceil((rawRange > 0 ? rawRange : 10) / noOfSections);

    // FIX 1: maxValue is strictly the height of the graph grid above the offset.
    // It should NOT include the yAxisOffset here.
    const maxValue = noOfSections * stepValue;

    return (
        <View
            style={{
                overflow: "hidden",
                width: "100%",
            }}
            onLayout={(event) => {
                setWidth(event.nativeEvent.layout.width);
            }}
        >
            {chartWidth > 0 && values.length > 0 && (
                <LineChart
                    data={values.map((v) => ({ ...v }))}
                    // FIX 2: Explicitly define height to stop vertical squishing
                    height={200}
                    width={chartWidth}

                    initialSpacing={10}
                    endSpacing={10}
                    spacing={values.length > 1 ? (chartWidth - 20) / (values.length - 1) : 0}
                    color={sharedStyles.primary}

                    // Rules and Axis formatting
                    showVerticalLines
                    verticalLinesColor="rgba(0,0,0,0.06)"
                    rulesColor="rgba(0,0,0,0.06)"
                    yAxisThickness={0}
                    xAxisThickness={1}

                    // Handled clean library math:
                    yAxisOffset={yAxisOffset}
                    noOfSections={noOfSections}
                    stepValue={stepValue}
                    maxValue={maxValue}
                />
            )}
        </View>
    );
}
