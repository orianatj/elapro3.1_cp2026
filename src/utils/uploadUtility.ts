
// Builds FormData payload for essay upload API endpoint
export function buildUploadFormData(
    file: File,
    ieltsType: string,
    taskType: string
): FormData {
    const formData = new FormData();
    formData.append("ielts_type", ieltsType);
    formData.append("task_type", taskType);
    formData.append("file", file);
    return formData;
}