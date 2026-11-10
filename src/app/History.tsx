import type { SleepRecord } from "@/types/sleep";
import { loadSleepRecords } from "@/utils/sleepStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function HistoryScreen() {
    const READ_HISTORY_FAILURE_MSG = "Reading storage failed!"
    const CLEAR_HISTORY_MSG = "History is cleaned!"
    const FAIL_CLEAR_MSG = "Fail to clean history!"

    const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
    useFocusEffect(useCallback(() => {
        async function loadHistory(): Promise<void> {
            try{
                setSleepRecords(await loadSleepRecords());

            }
            catch(error) {
                Alert.alert(
                    READ_HISTORY_FAILURE_MSG,
                    //READ_HISTORY_FAILURE_MSG,
                    String(error),
                    [{ text: "Retry", onPress: loadHistory }]
                );
            }
        }
        void loadHistory();
    }, []));

    async function clearHistory(): Promise<void> {
        try {
            await AsyncStorage.removeItem("sleepRecords");
            setSleepRecords([]);
            console.log(CLEAR_HISTORY_MSG);
        }
        catch(error) {
            Alert.alert(
                "Retry",
                FAIL_CLEAR_MSG,
                [{ text: "Retry", onPress: clearHistory }]
            )
        }

    }

    return (
        <View style = {{
            flex: 1,
            backgroundColor: "#13223a"
        }}>
            <Text style = {{
                color: "white",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 85,
                marginBottom: 15
            }}>History</Text>

            <View style={{ width: "85%",
                alignSelf: "center",
                padding: 5
            }}>
                <View style={{ flexDirection: "row", 
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#40516b",}}>
                    {["Start", "End", "Duration"].map(title => (
                    <Text
                        key={title}
                        style={{
                        flex: 1,
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 16
                        }}
                    >
                        {title}
                    </Text>
                    ))}
                </View>

                {sleepRecords.map(record => (
                    <View
                    key={record.startTime.getTime()}
                    style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                    }}
                    >
                    <Text style={{ flex: 1, color: "white", textAlign: "center" }}>
                        {record.startTime.toLocaleTimeString()}
                    </Text>
                    <Text style={{ flex: 1, color: "white", textAlign: "center" }}>
                        {record.endTime.toLocaleTimeString()}
                    </Text>
                    <Text style={{ flex: 1, color: "white", textAlign: "center" }}>
                        {record.duration}
                    </Text>
                    </View>
                ))}

                {sleepRecords.length === 0 && (
                    <Text
                    style={{
                        flex: 1,
                        color: "#aab8cc",
                        textAlign: "center",
                        paddingVertical: 20,
                    }}
                    >
                    No sleep records yet
                    </Text>
                )}
            </View>
            <Pressable onPress={clearHistory}
            style = {{
                alignSelf: "center",
                position: "absolute",
                bottom: 100
            }}> 
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: "orange",
                    padding: 10,
                    borderRadius: 10,
                }}>
                    Clean History
                </Text>
            </Pressable>
        </View>
    );
}