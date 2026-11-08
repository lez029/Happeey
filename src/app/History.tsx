import type { SleepRecord } from "@/types/sleep";
import { loadSleepRecords } from "@/utils/sleepStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function HistoryScreen() {
    const READ_HISTORY_FAILURE_MSG = "Reading storage failed!"
    const CLEAR_HISTORY_MSG = "History is cleaned!"
    const FAIL_CLEAR_MSG = "Fail to clean history!"

    const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
    useEffect(() => {
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
    }, []);

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
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#13223a",
        }}>
            <Text style = {{
                fontSize: 18,
                color: "white",
                padding: 10
            }}>History</Text>
            {
                sleepRecords.map(record =>
                    <View style = {{
                        flexDirection: "row",
                        width: "85%"
                    }}>
                        <Text key={record.startTime.getTime()}
                            style={{
                                color: "white",
                                flex: 1
                            }}>
                            {record.startTime.toLocaleTimeString()}
                        </Text>
                        <Text key={record.startTime.getTime()}
                            style={{
                                color: "white",
                                flex: 1
                            }}>
                            {record.endTime.toLocaleTimeString()}
                        </Text>
                        <Text key={record.startTime.getTime()}
                            style={{
                                color: "white",
                                flex: 1
                            }}>
                            {record.duration}
                        </Text>
                    </View>
                )
            }
            <Pressable onPress={clearHistory}> 
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: "orange",
                    margin: 15,
                    padding: 10,
                    borderRadius: 10,
                }}>
                    Clean History
                </Text>
            </Pressable>
        </View>
    );
}