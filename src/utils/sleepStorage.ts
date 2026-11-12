import { SleepRecord, StoredSleepRecord } from "@/types/sleep";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadSleepRecords(): Promise<SleepRecord[]> {
    try {

        const json = await AsyncStorage.getItem("sleepRecords");
        if (json == null) {
            return [];
        }
        const parsed: StoredSleepRecord[] = JSON.parse(json);
        const records = parsed.map(record => ({
            startTime: new Date(record.startTime),
            endTime: new Date(record.endTime),
            duration: record.duration
        }));
        return records;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export async function clearHistory(): Promise<void> {
    try {
        await AsyncStorage.removeItem("sleepRecords");
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}



/**
 * Appends a sleep record to the existing records in
 * persistent storage.
 *
 * If no records exist, initializes an empty array.
 * Preserves existing records when saving the new one.
 *
 * @param record - The sleep record to append.
 * @returns A promise that resolves when the record is saved.
 * @throws If reading, parsing, or writing the records fails.
 */
export async function storeSleepRecord(record: SleepRecord): Promise<void> {
    const json = await AsyncStorage.getItem("sleepRecords");
    const oldRecords: StoredSleepRecord[] = 
        json == null ? [] : JSON.parse(json);
    const updateRecords = [...oldRecords, record];
    await AsyncStorage.setItem(
        "sleepRecords", 
        JSON.stringify(updateRecords)
    );
}



