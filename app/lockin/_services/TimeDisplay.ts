export const getTimeDisplay = (data: Task[]) => {
    const totalSeconds = data 
        .reduce((sum, task) => sum + task.seconds_spent, 0) || 0;

    const totalMinutes = Math.round(totalSeconds / 60); // Total minutes
    const hours = Math.floor(totalMinutes / 60); // Total hours
    const minutes = totalMinutes % 60; // Remaining minutes

    const timeDisplay =
        hours > 0
        ? `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`
        : `${minutes} min`;
    return timeDisplay;
}