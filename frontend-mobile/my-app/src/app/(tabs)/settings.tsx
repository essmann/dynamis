import AddHistoryModal from "@/components/AddHistoryModal";
import { sampleEntries, sharedStyles } from "@dynamis/shared";
import { View, Text, Button, TextInput } from "react-native";

export default function Tab() {
    return (
        <View style={{ flex: 1 }}>
            {/* <View>
                <AddHistoryModal entries={sampleEntries} onAdd={function (): void {
                    throw new Error("Function not implemented.");
                }} onClose={function (): void {
                    throw new Error("Function not implemented.");
                }}></AddHistoryModal>
            </View>
            <View style={{ display: "flex", alignItems: "center" }}>
                <TextInput placeholder="80.5" style={{ backgroundColor: sharedStyles.bgHover, borderRadius: 8, borderWidth: 2, width: "100%", textAlign: "center", fontSize: 25, borderColor: sharedStyles.bgSurfaceHover }}></TextInput>

            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 1 }}>
                <View style={{ marginRight: 20 }}><Button title="Cancel" /></View>

                <View style={{ marginLeft: 20 }}><Button title="Submit" /></View>

            </View> */}
        </View>
    );
}

