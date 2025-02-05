export const getDayStartEnd = () => {
    const now = new Date();
    const today = new Date(now);

    // Define the start and end of the day in the user's time zone
    const startOfDayLocal = new Date(today);
    startOfDayLocal.setHours(0, 0, 0, 0); // 00:00 local time

    const endOfDayLocal = new Date(today);
    endOfDayLocal.setHours(23, 59, 59, 999); // 23:59 local time

    // Convert the start and end of the day to UTC to use in Supabase
    const startOfDayUTC = startOfDayLocal.toISOString();
    const endOfDayUTC = endOfDayLocal.toISOString();
    return {startOfDayUTC, endOfDayUTC};

}