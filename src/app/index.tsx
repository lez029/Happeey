import type { SleepRecord, StoredSleepRecord } from "@/types/sleep";
import { getSleepDuration } from "@/utils/sleep";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

// let testAttempts = 0;

export default function Homescreen() {
    const CLICK_WAKE_MSG = "Wake Up clicked!";
    const CLICK_SLEEP_MSG = "Start Sleep clicked!";
    const NULL_START_MSG = "StartTime must not be Null!";
    const SAVE_FAILURE_MSG =
        "Fail to save the record. \nPlease check your connection.";
    const TOO_SHORT_DURATION = "0 h 0 min";

    const [isSleeping, setIsSleeping] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [sleepDuration, setSleepDuration] = useState<string | null>(null);
    const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
    const [pendingRecord, setPendingRecord] =
        useState<SleepRecord | null>(null);
    
    /**
     * Starts a sleep session if isSleeping is false.
     * Otherwise, saves the pending record or creates and saves
     * a new record using the current time as the end time.
     */
    async function handlePress(): Promise<void> {
        console.log(isSleeping ? CLICK_WAKE_MSG : CLICK_SLEEP_MSG);

        if (!isSleeping) {
            const now = new Date();
            setStartTime(now);
            setSleepDuration(null);
            console.log(`Start Time: ${now}`);
            setIsSleeping(prev => !prev);
        } else {
            const now = new Date();
            let record: SleepRecord;
            if (startTime != null) {
                if (pendingRecord != null) {
                    record = pendingRecord;
                } else {
                    const duration = getSleepDuration(startTime, now);
                    if (duration == TOO_SHORT_DURATION) {
                        setIsSleeping(false);
                        setPendingRecord(null);
                        return;
                    }
                    record = {
                        startTime: startTime, endTime: now, duration: duration
                    }
                }
                saveRecord(record);
            } else {
                throw new RangeError(NULL_START_MSG);
            }
        }
    }



    /**
     * Save the sleep record to json and clear all variables
     */
    async function saveRecord(record: SleepRecord): Promise<void> {
        // testAttempts++;
        try {
            // Test the Retry Button
            /**
                if (testAttempts <= 2) {
                    throw new Error("Test Failure!");
                }
            */

            await saveSleepRecords(record);

            setSleepRecords(prev => [...prev, record]);
            setStartTime(null);

            //Set the time of the sleep session
            setSleepDuration(record.duration);

            console.log(`Sleep Duration: ${record.duration}`);
            console.log(`End Time: ${record.endTime}`);

            setIsSleeping(false);
            setPendingRecord(null);
        }
        catch (error) {
            console.error(error);
            setPendingRecord(prev => prev == null ? record : prev);
            Alert.alert(
                "Save Failed!",
                SAVE_FAILURE_MSG,
                [{ text: "Retry", onPress: () => saveRecord(record) }]);
            return;
        }
    }



    async function saveSleepRecords(record: SleepRecord): Promise<void> {
        const json = await AsyncStorage.getItem("sleepRecords");
        const oldRecords: StoredSleepRecord[] = 
            json == null ? [] : JSON.parse(json);
        const updateRecords = [...oldRecords, record];
        await AsyncStorage.setItem(
            "sleepRecords", 
            JSON.stringify(updateRecords)
        );
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#13223a"
        }}>

            <Text style={{
                color: "white",
                fontSize: 32,
                fontWeight: "bold"
            }}>
                {startTime == null ? "Welcome to Happeey" : "Recording Sleep..."}
            </Text>

            <Text style={{
                color: "white",
                fontSize: 18
            }}>
                Your Personal Sleep Tracker
            </Text>

            <Pressable onPress={handlePress}>
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: "orange",
                    margin: 15,
                    padding: 10,
                    borderRadius: 10,
                }}>
                    {isSleeping ? "Wake Up" : "Start Sleep"}
                </Text>
            </Pressable>

            <Text style={{
                color: "white",
                fontSize: 18
            }}>
                {isSleeping ? "" : sleepDuration}
            </Text>


        </View>
    );
}