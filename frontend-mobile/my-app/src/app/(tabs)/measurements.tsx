import AddHistoryModal from "@/components/AddHistoryModal";
import Chart from "@/components/LineChart";
import ThemedText from "@/components/ThemedText";
import { useMeasurementStore } from "@/stores/useMeasurementStore.ts";
import { computeRelativeDate, sampleEntries, sharedStyles, type HistoryEntry } from "@dynamis/shared";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Button, Pressable, Modal } from 'react-native';

export default function Tab() {
    //Modals
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [addHistoryModal, setAddHistoryModal] = useState<boolean>(false);

    //Tags; Visible ones in the header
    const measurementStore = useMeasurementStore();
    const selectedTagEntries = [...(measurementStore.getTag(measurementStore.selectedTag)?.records ?? [])];

    //Custom tags; displayed in the tag
    useEffect(() => {
        measurementStore.setEntries("Weight", sampleEntries);
    }, [])
    const sampleCustomEntries = sampleEntries.slice(0, 5);
    const isCustomTag = measurementStore.selectedTag !== "Weight" && measurementStore.selectedTag !== "Other";
    return (
        <>
            <Tabs.Screen
                options={{
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                setAddHistoryModal(true);
                            }}
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons
                                name="add"
                                size={24}
                                color={sharedStyles.bg} // Endre fargen slik at den matcher designet ditt
                            />
                        </Pressable>
                    ),

                }}
            />
            {addHistoryModal && <AddHistoryModal onAdd={() => ""} onClose={() => setAddHistoryModal(false)} />}
            <View style={styles.container}>
                <Tags dropDown={showTagDropdown} setDropdown={setShowTagDropdown} />
                <Chart values={selectedTagEntries} />
                <HistoryList values={selectedTagEntries} />
            </View></>
    );
}

function HistoryList({ values }: { values: HistoryEntry[] }) {
    return (
        <View style={styles.historySection}>
            <ThemedText style={styles.sectionHeader}>History</ThemedText>

            <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
                {values?.map((v, index) => {
                    const prev = index > 0 ? values[index - 1].value : undefined;
                    return <HistoryEntry prev={prev} value={v.value} date={v.date} key={`${v.date}-${index}`} />;
                })}
            </ScrollView>
        </View>
    );
}

function HistoryEntry({
    prev,
    value,
    date,
}: {
    prev?: number;
    value: number;
    date: string;
}) {
    const change = prev === undefined ? 0 : parseFloat((value - prev).toFixed(2));
    const isUp = change > 0;
    const isDown = change < 0;

    return (
        <View style={styles.historyEntry}>
            <View style={styles.leftCol}>
                <ThemedText style={styles.dateText}>{computeRelativeDate(date)}</ThemedText>
                {(isUp || isDown) && (
                    <View style={[
                        styles.changeBadge,
                        { backgroundColor: isDown ? sharedStyles.error + "22" : sharedStyles.success + "22" }
                    ]}>
                        <ThemedText style={[
                            styles.changeText,
                            { color: isDown ? sharedStyles.error : sharedStyles.success }
                        ]}>
                            {isUp ? "+" : ""}{change}
                        </ThemedText>
                    </View>
                )}
            </View>

            <View style={styles.valueRow}>
                <ThemedText style={styles.valueText}>{value}</ThemedText>
                <ThemedText style={styles.unitText}>kg</ThemedText>
            </View>
        </View>
    );
}
function Tags({ dropDown, setDropdown }: { dropDown: boolean, setDropdown: (b: boolean) => void }) {
    const tags = useMeasurementStore();
    const customEntries = ["Biceps", "Dick", "Legs"]
    const handlePress = (tagName: string) => {
        if (tagName == tags.selectedTag) return;
        if (tagName == "Other") return setDropdown(true);
        else {
            tags.setSelectedTag(tagName);
        }
    }
    const handleDropdownTagSelect = (entry: string) => {
        tags.addHeaderTag({ tagName: entry });
        tags.setSelectedTag(entry);
    }
    return (
        <View style={styles.tagsContainer}>
            {dropDown && <TagDropdown entries={customEntries} onClose={() => setDropdown(false)} onEntryPress={handleDropdownTagSelect} />}
            {tags.headerTags.map((tag) => {
                const selected = tags.selectedTag === tag.tagName

                return (
                    <Pressable onPress={() => handlePress(tag.tagName)}
                        style={[styles.tagButton, !selected && styles.tagButtonDisabled]}>
                        <ThemedText style={[{ color: sharedStyles.bgSurface, fontWeight: "bold", }, !selected && styles.disabledText]}>{tag.tagName}</ThemedText>
                    </Pressable>
                )
            })}
        </View>
    )
}

function TagDropdown({
    entries,
    onClose,
    onEntryPress,
}: {
    entries: string[]
    onClose: () => void
    onEntryPress: (entry: string) => void
}) {
    const handleEntryPress = (entry: string) => {
        onClose()
        onEntryPress(entry)
    }

    return (
        <Pressable style={StyleSheet.absoluteFill} onPress={() => onClose()}>
            <Modal
                animationType="fade"
                transparent
                visible={true}
                onRequestClose={onClose}
            >
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.card}>
                        {entries.map((entry) => (
                            <Pressable
                                key={entry}
                                style={({ pressed }) => [
                                    modalStyles.tag,
                                    pressed && modalStyles.tagPressed,
                                ]}
                                onPress={() => handleEntryPress(entry)}
                            >
                                <ThemedText style={modalStyles.tagText}>{entry}</ThemedText>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Modal>
        </Pressable>
    )
}

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        marginTop: 60,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingVertical: 8,

        // iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,

        // Android
        elevation: 6,
    },

    tag: {
        paddingHorizontal: 18,
        paddingVertical: 14,
    },

    tagPressed: {
        backgroundColor: '#f3f4f6',
    },

    tagText: {
        fontSize: 16,
        color: '#111827',
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    historySection: {
        flex: 1,
        marginTop: 20,
    },
    sectionHeader: {
        marginLeft: 4,
        marginBottom: 10,
        fontSize: 13,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.6,
        color: sharedStyles.textSecondary,
    },
    historyList: {
        flex: 1,
    },
    historyEntry: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: sharedStyles.bgHover
    },
    leftCol: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateText: {
        color: sharedStyles.textSecondary,
        fontWeight: "bold",
        fontSize: 13,
    },
    changeBadge: {
        marginLeft: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    changeText: {
        fontSize: 11,
        fontWeight: "700",
    },
    valueRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    valueText: {
        fontWeight: "500",
        fontSize: 16,
        color: sharedStyles.text,
        fontVariant: ["tabular-nums"],
    },
    unitText: {
        fontSize: 12,
        marginLeft: 3,
        marginBottom: 1,
        fontWeight: "600",
        color: sharedStyles.textSecondary,

    },
    tagsContainer: {
        display: "flex",
        flexDirection: "row"
    },
    tagButton: {
        backgroundColor: sharedStyles.primary,
        padding: 4,
        display: "flex",
        marginLeft: 2,
        borderRadius: 8,
        color: sharedStyles.bg

    },
    tagButtonDisabled: {
        backgroundColor: sharedStyles.bg,
        opacity: 50,

    },
    disabledText: {
        color: sharedStyles.text,
        fontWeight: 500
    }
});