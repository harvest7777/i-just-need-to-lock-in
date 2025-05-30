export const getTimeDisplayFromIntervals = (data: TaskInterval[]) => {
    let totalSeconds=0;
    data.forEach((interval) => {
        const startLocal = new Date(interval.start_time);
        const endLocal = new Date(interval.end_time);

        const diffSeconds = Math.floor((endLocal.getTime() - startLocal.getTime())/1000);
        totalSeconds+=diffSeconds;
    })

    const totalMinutes = Math.round(totalSeconds / 60); // Total minutes
    const hours = Math.floor(totalMinutes / 60); // Total hours
    const minutes = totalMinutes % 60; // Remaining minutes

    const timeDisplay =
        hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes}m`;
    return timeDisplay;
}

export const getTimeDisplayFromSeconds = (seconds: number) => {
    const totalMinutes = Math.round(seconds/ 60); // Total minutes
    const hours = Math.floor(totalMinutes / 60); // Total hours
    const minutes = totalMinutes % 60; // Remaining minutes

    const timeDisplay =
        hours > 0
        ? `${hours}h${hours > 1 ? "s" : ""} ${minutes}m`
        : `${minutes}m`;
    return timeDisplay;

}