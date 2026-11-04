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