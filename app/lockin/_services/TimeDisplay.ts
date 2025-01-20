export const getTimeDisplayFromIntervals = (data: TaskInterval[]) => {
    console.log(data)
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
        ? `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`
        : `${minutes} min`;
    return timeDisplay;
}