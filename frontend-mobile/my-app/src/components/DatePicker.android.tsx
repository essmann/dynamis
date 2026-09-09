import { useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type DatePickerProps = {
    onSubmit: (date: Date) => void;
};

export const DatePicker = ({ onSubmit }: DatePickerProps) => {
    const [date, setDate] = useState(new Date());
    const onChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {

        if (selectedDate) {
            setDate(selectedDate);
            onSubmit(selectedDate);
        }
    };

    return (
        <SafeAreaView>


            <Text>
                Selected: {date.toLocaleDateString()}
            </Text>

            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                onChange={onChange}
            />
        </SafeAreaView>
    );
};
