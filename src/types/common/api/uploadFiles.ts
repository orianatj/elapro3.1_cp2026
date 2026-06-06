// Response returned after essay upload and text extraction
export type UploadFileResponse = {
    message: string;
    ieltsType: string;
    taskType: string;
    essayText: string;
    sourceFile: string;
    charCount: number;
};


