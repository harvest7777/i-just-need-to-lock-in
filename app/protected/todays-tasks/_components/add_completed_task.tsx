"use client";
import React, { useState } from "react";
import { insertCompletedTask } from "../_services/InsertCompletedTask";
// UI for adding an already completd task
export default function AddCompletedTask() {
    // Handle all value changes of added task name and minutes spent doing
    const [taskName, setTaskName] = useState('');
    const [taskMinutes, setTaskMinutes] = useState('');
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    }
    
    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskMinutes(e.target.value);
    }
    
    const isValidInput = (): boolean => {
        return (taskName != '' && taskMinutes != '');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isValidInput())
        {
            const tasksMinutesNumber: number = parseInt(taskMinutes, 10);
            try {
                await insertCompletedTask(taskName, tasksMinutesNumber);
            } catch(error) {
                console.log("Error submitting completed task.", error);
            }
        }
        setTaskName('');
        setTaskMinutes('');
    }
        
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input value={taskName} onChange={handleNameChange} placeholder="task name"></input>
                <input type="number" value={taskMinutes} onChange={handleMinuteChange} placeholder="minutes spent"></input>
                <button type="submit">submit task</button>
            </form> 
        </>
    )
}