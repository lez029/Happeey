const RATIO_HOUR_MIN = 60;

export function minutesToHour(minutes: number): number{
    checkMinutesRange(minutes);
    return minutes / RATIO_HOUR_MIN;
}

export function formatSleepDuration(minutes: number): string{
    checkMinutesRange(minutes);

    let numHour = Math.floor(minutes / RATIO_HOUR_MIN);
    let numMinute = minutes - numHour * RATIO_HOUR_MIN;
    return `${numHour} hour(s) ${numMinute} minute(s)`;
}

export function validateSleepMinutes(minutes: number): void{
    if (Number.isNaN(minutes) || minutes < 0 || Number.isFinite(minutes)) {
        throw new RangeError("Minutes cannot be negative!")
    }
}

console.log(formatSleepDuration(485));