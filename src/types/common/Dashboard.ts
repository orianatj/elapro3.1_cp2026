
// Define a union type to strongly type ieltsType
export type IeltsType = "academic" | "general";

// Define a union type to strongly type taskType
export type TaskType = "task1" | "task2";


// Define a type or Student Progress Tracking chart 
export type StudentProgressTracking = {
    userId?: string;
    fromDate?: string;
    toDate?: string;
    ieltsType?: IeltsType;
    taskType?: TaskType;
};

// Define type for ProgressChartPoint 
export type ProgressChartPoint = {
    submissionTimestamp: string;
    taskResponse: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammticalRangeAccuracy: number;
    overallScore: number;
};

// Define a union type to strongly type chart aggregation levels 
export type AggregationLevel = "daily" | "weekly" | "monthly" | "quarterly";


// Define type for single chart point 
export type AggregatedChartPoint = {
    dateLabel: string;
    totalSubmissions: number;
    meanOverallScore: number;
    meanTaskResponse: number;
    meanCoherenceCohesion: number;
    meanLexicalResource: number;
    meanGrammaticalRangeAccuracy: number;
};

// Define type for data returned by useStudentProgressTracking hook
export type ProgressChartData = {
    shouldRender: boolean;
    message?: string;
    aggregationLevel?: AggregationLevel;
    chartData?: AggregatedChartPoint[];
};

// Define a union type to strongly type for chart visbility state
export type CriterionKey = "meanOverallScore" | "meanTaskResponse" | "meanCoherenceCohesion" | "meanLexicalResource" | "meanGrammaticalRangeAccuracy";

// Define a union type to strongly type toggle labels 
export type ToggleLabel = "Overall Score" | "Task Response" | "Coherence & Cohesion" | "Lexical Resource" | "Grammatical Range & Accuracy";

// Define type for criterion toggle object
export type CriterionToggleConfig = {
    key: CriterionKey;
    label: ToggleLabel;
};