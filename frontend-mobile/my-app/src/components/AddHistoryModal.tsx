import { HistoryEntry, sharedStyles } from "@dynamis/shared"
import { Button, Modal, TextInput, View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from "react-native-calendars";
import { DatePicker } from "./DatePicker.android";
import { useState } from "react";
type props = { onAdd: () => void, onClose: () => void }


export default function AddHistoryModal({ onAdd, onClose }: props) {
    const [selectedDate, setSelectedDate] = useState("");
    return (
        <Modal animationType="slide" visible>
            <View style={{ flex: 1 }}>
                <View>
                    <Calendar

                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                        }}

                        markedDates={
                            selectedDate
                                ? {
                                    [selectedDate]: {
                                        selected: true,
                                        selectedColor: sharedStyles.primary
                                    },
                                }
                                : {}
                        }
                    //
                    />
                </View>
                <View style={{ display: "flex", alignItems: "center" }}>
                    <TextInput placeholder="80.5" style={{ backgroundColor: sharedStyles.bgHover, borderRadius: 8, borderWidth: 2, width: "100%", textAlign: "center", fontSize: 25, borderColor: sharedStyles.bgSurfaceHover }}></TextInput>

                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 1 }}>
                    <View style={{ marginRight: 20 }}><Button title="Cancel" onPress={onClose} /></View>

                    <View style={{ marginLeft: 20 }}><Button title="Submit" /></View>

                </View>
            </View>
        </Modal>
    )
}