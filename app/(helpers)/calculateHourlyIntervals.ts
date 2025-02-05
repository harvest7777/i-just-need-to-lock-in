export const calculateHourlyIntervals = (data: TaskInterval[]) => {
    const intervals = Array(24).fill(0);

    for(const task of data) {
        const startTime = new Date(task.start_time);
        const endTime = new Date(task.end_time);

        const startTimeMinutes = startTime.getHours()*60+startTime.getMinutes(); 
        const endTimeMinutes = endTime.getHours()*60+endTime.getMinutes(); 

        for (let i = 0; i < 24; i++) {
            const intervalStart = i * 60;  // Start of interval in minutes (e.g., 0, 60, 120, ...)
            const intervalEnd = (i + 1) * 60; // End of interval in minutes (e.g., 60, 120, 180, ...)

            // Calculate the overlap between the task and the interval
            const overlapStart = Math.max(intervalStart, startTimeMinutes)
            const overlapEnd = Math.min(intervalEnd, endTimeMinutes);

            // If the task's time overlaps with the interval, add the overlap duration (in minutes)
            if (overlapStart < overlapEnd) {
                intervals[i] += (overlapEnd - overlapStart); // Add the overlap in minutes
            }
        }

    }
    return intervals; 
}