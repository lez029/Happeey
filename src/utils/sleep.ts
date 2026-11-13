//Constant List
const RATIO_HOUR_MIN = 60;
const RATIO_MIN_SEC = 60;
const RATIO_SEC_MILLSEC = 1000;
const INVALID_MIN_MSG = "Minutes must be finite and non-negative!";
const INVALID_DATE_MSG = "Dates must be valid!";
const END_EARLIER_MSG = "EndTime is earlier than StartTime!";



/**
 * Converts a duration from minutes to hours with decimals.
 * 
 * Validates the duration in minutes before convertions.
 * 
 * @param minutes the duration in minutes
 * @return the duration in hours with decimals
 * 
 */
export function minutesToHour(minutes: number): number{
    validateSleepMinutes(minutes);
    return minutes / RATIO_HOUR_MIN;
}



/**
 * Format the
 */
export function formatSleepDuration(minutes: number): string{
    minutes = normalizeSleepMinutes(minutes);

    let numHour = Math.floor(minutes / RATIO_HOUR_MIN);
    let numMinute = minutes - numHour * RATIO_HOUR_MIN;
    return `${numHour} h ${numMinute} min`;
}



export function calculateSleepDuration(
    startTime: Date,
    endTime: Date
): number {
    validateSleepDuration(startTime, endTime);

    return Math.round(
        (endTime.getTime() - startTime.getTime()) 
        / RATIO_SEC_MILLSEC 
        / RATIO_MIN_SEC
    );
}



export function getSleepDuration(
    startTime: Date,
    endTime: Date
): string {
    return formatSleepDuration(
        calculateSleepDuration(startTime, endTime)
    )
}



function validateSleepDuration(
    startTime: Date,
    endTime: Date
): void {
    const start = startTime.getTime();
    const end = endTime.getTime();

    if (!Number.isFinite(start) || 
        !Number.isFinite(end)) {
        throw new RangeError(INVALID_DATE_MSG);
    }
    if (start > end) {
        throw new RangeError(END_EARLIER_MSG);
    }
}



function validateSleepMinutes(minutes: number): void{
    if (!Number.isFinite(minutes) || minutes < 0) {
        throw new RangeError(INVALID_MIN_MSG);
    }
}



export function normalizeSleepMinutes(minutes: number): number{
    validateSleepMinutes(minutes);
    return Math.round(minutes);
}
