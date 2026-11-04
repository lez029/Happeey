import type { SleepRecord } from "@/types/sleep";
import { loadSleepRecords } from "@/utils/sleepStorage";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

export default function HistoryScreen() {
    const READ_HISTORY_FAILURE_MSG = "Reading storage failed!"

    const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
    useEffect(() => {
        async function loadHistory(): Promise<void> {
            try{
                setSleepRecords(await loadSleepRecords());

            }
            catch(error) {
                Alert.alert(
                    "Reading Failed",
                    //READ_HISTORY_FAILURE_MSG,
                    String(error),
                    [{ text: "Retry", onPress: loadHistory }]
                );
            }
        }
        void loadHistory();
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#13223a"
        }}>
            <Text>History</Text>
            {
                sleepRecords.map(record =>
                    <Text key={record.startTime.getTime()}
                        style={{
                            color: "white"
                        }}>
                        {record.duration}
                    </Text>
                )
            }
        </View>
    );
}