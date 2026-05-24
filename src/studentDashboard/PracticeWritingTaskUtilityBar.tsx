
import { useEffect, useState } from "react";
import type { TaskUtilityBar } from "../types/student/common/TaskUtilBar"

import { formatTimer } from "../utils/dateUtils";
import { FiClock, FiPause, FiRotateCw } from "react-icons/fi";

type TaskUtilityBarProps = {
    utilData: TaskUtilityBar;
};

export function TaskUtilityBar({ utilData }: TaskUtilityBarProps) {

    // Local state for countdown timer
    const [time, setTime] = useState(utilData.timeRemaining);

    // Countdown effect
    useEffect(() => {

        // Only run timer if session is active and not paused
        if (!utilData.isActive || utilData.isPaused) return;

        const interval = setInterval(() => {
            setTime((prev) => {

                // Stop at 0
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        // Cleanup to avoid memory leaks
        return () => clearInterval(interval)
    }, [utilData.isActive, utilData.isPaused]);


    // Sync if reset from parent
    useEffect(() => {
        setTime(utilData.timeRemaining);
    }, [utilData.timeRemaining]);

    return (
        <div className="task-utility-bar">

            {/* Left Section - Title */}
            <div className="utility-section">

                {/* Session label */}
                <div className="task-title">
                    <h4>{utilData.taskTitle}</h4>
                </div>

            </div>

            {/* Divider */}
            <span className="divider">|</span>

            {/* Middle Section - Timer and controls */}
            <div className="utility-section">

                {/* Timer */}
                <div className="task-timer">
                    <FiClock className="timer-icon" />
                    <span>{formatTimer(time)}</span>
                </div>

                {/* Controls Group */}
                <div className="controls-group">

                    {/* Pause button */}
                    <button className="icon-button">
                        <FiPause />
                    </button>

                    {/* Small divider */}
                    <span className="mini-divider"></span>

                    {/* Reset Button */}
                    <button className="icon-button">
                        <FiRotateCw />
                    </button>

                </div>




            </div>

            {/* Divider */}
            <span className="divider">|</span>

            {/* Right Section - Word counter */}
            <div className="utility-section">

                {/* Word Counter */}
                <span className="word-count">
                    Word count: {utilData.userWordCount}
                </span>

            </div>
        </div>
    )
}