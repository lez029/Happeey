import type { SleepRecord } from "@/types/sleep";
import { getSleepDuration } from "@/utils/sleep";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function Homescreen() {
    const[isSleeping, setIsSleeping] = useState<boolean>(false);
    const[startTime, setStartTime] = useState<Date | null>(null);
    const[sleepDuration, setSleepDuration] = useState<string | null>(null);
    const CLICK_WAKE_MSG = "Wake Up clicked!";
    const CLICK_SLEEP_MSG = "Start Sleep clicked!";
    const NULL_START_MSG = "StartTime must not be Null!";
    const SAVE_FAILURE_MSG = "Fail to save the record!"
    const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);

    async function saveSleepRecords(records: SleepRecord[]): Promise<void> {
      const json = JSON.stringify(records);
      await AsyncStorage.setItem("sleepRecords", json);
    }

    async function handlePress(): Promise<void> {
      console.log(isSleeping ? CLICK_WAKE_MSG : CLICK_SLEEP_MSG);

      if (!isSleeping) {
        const now = new Date();
        setStartTime(now);
        setSleepDuration(null);
        console.log(`Start Time: ${now}`);
        setIsSleeping(prev => !prev);
      } else{
        const now = new Date();
        if (startTime != null) {
          const duration = getSleepDuration(startTime, now);
          const record = {
            startTime: startTime, endTime: now, duration: duration
          }
          try{
            await saveSleepRecords([...sleepRecords, record]);

            setSleepRecords(prev => [...prev, record]);
            setStartTime(null);
            setSleepDuration(duration);
            
            console.log(`Sleep Duration: ${duration}`);
            console.log(`End Time: ${now}`);

            setIsSleeping(prev => !prev);
          }
          catch{
            console.error(SAVE_FAILURE_MSG);
          }

        } else {
          throw new RangeError(NULL_START_MSG);
        }
      }
    }

    return (
      <View style = {{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : "#13223a" 
      }}>

          <Text style = {{
              color: "white",
              fontSize: 32,
              fontWeight: "bold"
          }}>
            {startTime == null ? "Welcome to Happeey" : "Recording Sleep..."}
          </Text>
            
          <Text style = {{
              color: "white",
              fontSize: 18
          }}>
            Your Personal Sleep Tracker
          </Text>
          
          <Pressable onPress={handlePress}>
            <Text style = {{
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

          <Text style = {{
              color: "white",
              fontSize: 18
          }}>
            {isSleeping ? "" : sleepDuration}
          </Text>

          {
            sleepRecords.map(record => 
            <Text key = {record.startTime.getTime()} 
            style = {{
              color: "white"
            }}>
              {record.duration}
            </Text>
          )
          }
      </View>
    );
}