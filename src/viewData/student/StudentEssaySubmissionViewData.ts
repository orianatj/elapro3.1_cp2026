import type {TaskUtilityBar} from "./common/TaskUtilBar.ts";
import type {TaskDescription} from "./common/TaskDescriptionDTO.ts";
import type {TaskAnswer} from "./common/TaskAnswerDTO.ts";
import type { IeltsType, TaskType, StudentFilter} from "./common/StudentFilter.ts";


/**
 * This view data represents the data required to render
 * the Essay Submission page. It is comprised of data type objects defined in this file.
 */

export interface EssaySubmission {
    taskBar: TaskUtilityBar;
    ieltsSelection: StudentFilter<IeltsType>;
    taskSelection: StudentFilter<TaskType>;
    taskDescription: TaskDescription;
    essayUpload: EssayUpload;
    answer: TaskAnswer;
};


// Type defines the essay upload data structure
export type EssayUpload = {
    placeHolderText: string;
    fileName: string;
    fileType: AcceptedFileTypes;
    filePath:string;
    fileProvided: boolean;
    isValid: boolean;
    isSuccessful: boolean;
};

// Union type defines acceptable file format for essay upload
export type AcceptedFileTypes = "txt" | "pdf" | "docx";

