

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
export type AggregationLevel = "raw" | "daily" | "weekly" | "monthly" | "quarterly";


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



export type ChartMode = "empty" | "raw" | "aggregated";

// Define type for data returned by useStudentProgressTracking hook
export type ProgressChartData = {
    chartMode: ChartMode;
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

// Define a union type to strongly type filter key 
export type FilterKey = "ieltsType" | "taskType";

// Define a union type to strongly type ielts filter options
export type IeltsOption = "general" | "academic";

// Define a union type to strongly type task filter options
export type TaskOption = "task1" | "task2";

export type IeltsLabel = "General" | "Academic";

export type TaskLabel = "Task 1" | "Task 2";

export type FilterLabel = "IELTS Type" | "Task Type";


export type FilterOption<TValue, TLabel> = {
    value: TValue;
    label: TLabel;
    disabled?: boolean;
};

export type FilterMetadata = {
    filterKey: FilterKey;
    label: FilterLabel;
};

export type IeltsFilterOptions = FilterOption<IeltsOption, IeltsLabel>;

export type TaskFilterOptions = FilterOption<TaskOption, TaskLabel>;

export type FilterConfig<TOption> = {
    filterKey: FilterKey;
    label: FilterLabel;
    selected?: string;
    options: TOption[];
};

export type RuntimeFilter = FilterConfig<IeltsFilterOptions> | FilterConfig<TaskFilterOptions>;

