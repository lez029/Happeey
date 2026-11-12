import type { SleepRecord } from "@/types/sleep";
import { getSleepDuration } from "@/utils/sleep";
import { storeSleepRecord } from "@/utils/sleepStorage";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

// let testAttempts = 0;

/**
 * Renders the home screen of the Happeey sleep tracker.
 *
 * Manages sleep sessions, including starting and ending
 * sessions, calculating sleep duration, and persisting
 * sleep records using AsyncStorage.
 *
 * Maintains the current sleep state and provides retry
 * functionality when saving a record fails.
 *
 * Sleep sessions shorter than one minute (based on the
 * formatted duration) are discarded without being saved.
 *
 * @returns The home screen UI.
 */
export default function Homescreen() {
    // Constants Declaration
    // String Constants
    const CLICK_WAKE_MSG = "Wake Up clicked!";
    const CLICK_SLEEP_MSG = "Start Sleep clicked!";
    const NULL_START_MSG = "StartTime must not be Null!";
    const SAVE_FAILURE_MSG =
        "Fail to save the record. \nPlease check your connection.";
    const TOO_SHORT_DURATION = "0 h 0 min";

    // State Constants
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
     * 
     * @return  Promise<voide> nothing
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
                    // Reuse the original record to preserve its end time
                    // and duration when retrying a failed save.
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
     * Persists a sleep record and updates the application state.
     *
     * State updates occur only after storage succeeds to prevent
     * the UI from treating an unsaved session as completed.
     *
     * If saving fails, the record is preserved for retrying,
     * and the user is notified through an alert.
     *
     * @param record - The sleep record to persist.
     * @returns A promise that resolves after processing
     *          the save attempt.
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

            await storeSleepRecord(record);

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
            // Alert to users and allow them retry
            Alert.alert(
                "Save Failed!",
                SAVE_FAILURE_MSG,
                [{ text: "Retry", onPress: () => saveRecord(record) }]);
            return;
        }
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
                {!isSleeping  ? "Welcome to Happeey" : "Recording Sleep..."}
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