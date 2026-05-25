import { useState, useEffect } from "react";

import type { TaskAnswer } from "../types/student/common/TaskAnswerDTO";

type AnswerEditorProps = {
    answer: TaskAnswer;
    onWordCountChange: (count: number) => void;
    onTextChange: (text: string) => void;
};

export function AnswerEditor({ answer, onWordCountChange, onTextChange }: AnswerEditorProps) {

    // Local state for answer text
    const [text, setText] = useState(answer.answerText ?? "");
    useEffect(() => {
        setText(answer.answerText ?? "");
    }, [answer.answerText]);

    // Calculate word count from text
    const trimmed = text.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;

    // Notify parent whenever count changes
    useEffect(() => {
        onWordCountChange(wordCount);
    }, [wordCount, onWordCountChange]);


    return (
        <div className="answer-editor">

            {/* Text input */}
            <textarea
                className="answer-textarea"
                value={text}
                onChange={(e) => {
                    const value = e.target.value;
                    setText(value);
                    onTextChange(value);
                }}

                placeholder="Write your answer here"
            />

        </div>
    );
}