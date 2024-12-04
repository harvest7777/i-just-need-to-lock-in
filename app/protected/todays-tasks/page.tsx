"use client";
import AddCompletedTask from "./_components/add_completed_task";
import AddTask from "./_components/add_task";
export default function TodaysTasks() {
    return(
        <div>
            <h1>Todays Tasks:</h1>
            <AddCompletedTask/>
            <AddTask/>
        </div>
    )
}