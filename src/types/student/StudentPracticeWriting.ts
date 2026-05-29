import type { PageHeaderViewData } from "../common/PageHeaderDTO"; 
import type {TaskUtilityBar} from "./common/TaskUtilBar";
import type {TaskDescription} from "./common/TaskDescriptionDTO";
import type {TaskAnswer} from "./common/TaskAnswerDTO";
import type { IeltsType, TaskType, StudentFilter} from "./common/StudentFilter";

/**
 * This view data represents the data required to render
 * the Practice Writing page. It is comprised of data type objects defined in this file & imported re-useables DTOs.
 */
export interface PracticeWriting {
    pageHeader: PageHeaderViewData; 
    taskBar: TaskUtilityBar;
    ieltsSelection: StudentFilter<IeltsType>;
    taskSelection: StudentFilter<TaskType>;    
    taskDescription: TaskDescription;
    answer: TaskAnswer;
};