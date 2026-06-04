
import { useEffect, useState } from "react";
import type { TaskUtilityBar } from "../types/student/common/TaskUtilBar"

import { formatTimer, decrementTimer, shouldContinue } from "../utils/countdownTimer";
import { FiClock, FiPlay, FiPause, FiRotateCw } from "react-icons/fi";

type TaskUtilityBarProps = {
    utilData: TaskUtilityBar;
};

export function TaskUtilityBar({ utilData }: TaskUtilityBarProps) {

    // Local state for countdown timer
    const [time, setTime] = useState(utilData.timeRemaining);
    const [isRunning, setIsRunning] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    // Button handlers
    // Start button initiates countdown
    const handleStart = () => {
        setIsRunning(true);
    };

    // Pause button stops the timer without resetting time
    // Toggles between pause and resume
    const handlePause = () => {
        setIsRunning((prev) => !prev);
    };

    // Stop timer and reset time back to initial value
    const handleReset = () => {
        setTime(utilData.timeRemaining);
        setIsRunning(false);
        setIsExpired(false);
    };

    // Countdown effect
    useEffect(() => {

        // Only run timer if session is active and not paused
        if (!isRunning || utilData.isPaused) return;

        const interval = setInterval(() => {
            setTime((prev) => {

                // Stop at 0
                if (!shouldContinue(prev)) {
                    setIsExpired(true);
                    setIsRunning(false);
                    return 0;
                }

                return decrementTimer(prev);
            });
        }, 1000);

        // Cleanup to avoid memory leaks
        return () => clearInterval(interval)
    }, [isRunning, utilData.isPaused]);


    // Sync if reset from parent
    useEffect(() => {
        setTime(utilData.timeRemaining);
        setIsExpired(false);
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
                    <span className={time === 0 ? "timer-expired" : ""}>
                        {formatTimer(time)}
                    </span>
                </div>

                {isExpired && (
                    <div className="time-expired">
                        Your time has expired. Please review your answer and submit when ready.
                    </div>
                )}


                {/* Controls Group */}
                <div className="controls-group">
                    {/* Play button */}
                    <button className="icon-button" onClick={handleStart} disabled={isRunning || utilData.isPaused || isExpired}>
                        <FiPlay />
                    </button>

                    {/* Small divider */}
                    <span className="mini-divider"></span>

                    {/* Pause button */}
                    <button className="icon-button" onClick={handlePause} disabled={isExpired}>
                        <FiPause />
                    </button>

                    {/* Small divider */}
                    <span className="mini-divider"></span>

                    {/* Reset Button */}
                    <button className="icon-button" onClick={handleReset}>
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