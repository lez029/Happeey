import { getSleepDuration } from "@/utils/sleep";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function Homescreen() {
    const[isSleeping, setIsSleeping] = useState<boolean>(false);
    const[startTime, setStartTime] = useState<Date | null>(null);
    const[sleepDuration, setSleepDuration] = useState<string | null>(null);
    const CLICK_WAKE_MSG = "Wake Up clicked!";
    const CLICK_SLEEP_MSG = "Start Sleep clicked!";
    const NULL_START_MSG = "StartTime must not be Null!";

    function handlePress(): void {
      console.log(isSleeping ? CLICK_WAKE_MSG : CLICK_SLEEP_MSG);

      if (!isSleeping) {
        const now = new Date();
        setStartTime(now);
        console.log(`Start Time: ${now}`);
      } else{
        const now = new Date();
        if (startTime != null) {
          const duration = getSleepDuration(startTime, now);
          setSleepDuration(duration);

          console.log(`Sleep Duration: ${duration}`);
          console.log(`End Time: ${now}`);

          setStartTime(null);
        } else {
          throw new RangeError(NULL_START_MSG);
        }
      }

      setIsSleeping(prev => !prev);
    }

    return (
      <View style = {{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : "#13223a" 
      }}>

        {startTime == null &&(
            <Text style = {{
                color: "white",
                fontSize: 32,
                fontWeight: "bold"
            }}>
              Welcome to Happeey
            </Text>
        )}

        {startTime != null &&(
            <Text style = {{
                color: "white",
                fontSize: 32,
                fontWeight: "bold"
            }}>
              Recording Sleep
            </Text>
        )}

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
      </View>
    );
}