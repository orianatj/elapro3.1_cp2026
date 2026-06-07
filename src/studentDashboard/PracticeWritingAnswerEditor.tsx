import { useState, useEffect } from "react";

import type { TaskAnswer } from "../types/student/common/TaskAnswerDTO";

type AnswerEditorProps = {
    answer: TaskAnswer;
    onTextChange: (text: string) => void;
};

export function AnswerEditor({
    answer,
    onTextChange
}: AnswerEditorProps) {

    // Local editor state
    const [text, setText] = useState(answer.answerText ?? "");

    // Sync uploaded/generated text into editor
    useEffect(() => {
        setText(answer.answerText ?? "");
    }, [answer.answerText]);

    return (
        <div className="answer-editor">

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