
// Maps UI IELTS type to API format (currently identical)
export const mapIeltsTypeToApi = (
  ieltsType: string | undefined
): string => {
  return ieltsType === "academic" ? "academic" : "general";
};

// Maps UI task type ("task1", "task2") to API format ("task1", "task2")
export const mapTaskTypeToApi = (
  taskType: string | undefined
): string => {
  return taskType === "task2" ? "task2" : "task1";
};