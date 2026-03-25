import type {TaskUtilityBar} from "./common/TaskUtilBar";
import type {TaskDescription} from "./common/TaskDescriptionDTO.ts";
import type {TaskAnswer} from "./common/TaskAnswerDTO";
import type { IeltsType, TaskType, StudentFilter} from "./common/StudentFilter";


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
    fileType: AcceaptedFileTypes;
    filePath:string;
    fileProvided: boolean;
    isValid: boolean;
    isSuccessful: boolean;
};

// Union type defines acceptable file format for essay upload
export type AcceaptedFileTypes = "txt" | "pdf" | "docx";

