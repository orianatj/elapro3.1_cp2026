
import {
    useEffect,
    useMemo,
    useState
} from "react";

import { getStudentSubmissions } from "../services/studentSubmissionsService";

import type {
    StudentSubmissions,
    SubmissionTableRow
} from "../types/student/StudentSubmissionsViewData";

import type {
    FilterValue,
    IeltsType,
    TaskType,
} from "../types/student/common/StudentFilter";

/**
 * useStudentSubmissions Hook
 *
 * Responsibilities:
 * - Own UI state for the Submissions page
 * - Fetch and transform backend data
 * - Produce StudentSubmissions ViewData for the View layer
 */
export function useStudentSubmissions(userId: string) {

    /* ==================== FILTER STATE ==================== */
    // Functions to update the IELTS and Task filters.
    // Calling either will trigger a re-render and refresh the derived ViewData.
    const [ieltsType, setIeltsType] =
        useState<FilterValue<IeltsType>>("all");  // Accepted values: "all", "academic", or "general". Default set to "all"

    const [taskType, setTaskType] =
        useState<FilterValue<TaskType>>("all");   // Accepted values: "all", "task-one", or "task-two". Default set to "all"

    /* ==================== DATA STATE ==================== */
    // State for the submissions data fetched from the backend, as well as loading and error states.
    const [rows, setRows] = useState<SubmissionTableRow[]>([]);  // UI-ready table rows derived from backend submissions.
    const [isLoading, setIsLoading] = useState<boolean>(false);  // Loading flag used by the page to render spinners / skeleton states.
    const [error, setError] = useState<string | null>(null);     // Error message string if data fetching fails, otherwise null.

    /* ============ SIDE EFFECTS: DATA FETCHING ============ */
    // Fetch submissions from the backend whenever the userId or any filter changes.
    useEffect(() => {
        // Guards against state updates if the component using this hook unmounts
        // before the async request completes.
        let isMounted = true;

        async function fetchSubmissions() {
            setIsLoading(true);
            setError(null);

            try {
                // Delegate network concerns to the service layer.
                // Filtering parameters are kept explicit rather than embedded in the service.
                const response = await getStudentSubmissions({
                    userId,
                    ieltsType: ieltsType === "all" ? undefined : ieltsType,
                    taskType: taskType === "all" ? undefined : taskType,
                });

                if (!isMounted) return;

                // Transform backend models into UI-safe, presentation-ready rows.
                const mappedRows: SubmissionTableRow[] = response.map(
                    (submission: any): SubmissionTableRow => ({
                        submissionId: submission.submissionId,
                        date: formatDateTime(submission.submissionTimestamp),
                        essayType: submission.submissionGroup === 1
                            ? "Practice"
                            : "Submitted Essay",
                        ieltsType: submission.ieltsType,
                        taskType: submission.taskType,
                        score: submission.overallScore ?? undefined,  // score is optional and may be undefined if not yet graded
                    })
                );

                setRows(mappedRows);
            } catch (err) {
                if (!isMounted) return;
                setError("Unable to load submissions.");
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchSubmissions();

        return () => {
            isMounted = false;
        };
    }, [userId, ieltsType, taskType]);

    /* ==================== DERIVED VIEW DATA ==================== */
    // Cache the construction of the StudentSubmissions view data to avoid unnecessary recalculations on every render.
    const viewData: StudentSubmissions = useMemo(
        () => ({
            pageHeader: {
                title: "Submissions",
                breadcrumb: [
                    { label: "Dashboard", link: "/student/dashboard" },
                    { label: "Submissions" },
                ],
            },

            // Filter configuration consumed directly by the Filters component.
            filters: {
                ieltsType: {
                    title: "IELTS Type",
                    selected: ieltsType,
                    options: [
                        { value: "all", label: "All" },
                        { value: "academic", label: "Academic" },
                        { value: "general", label: "General" },
                    ],
                },
                taskType: {
                    title: "Task Type",
                    selected: taskType,
                    options: [
                        { value: "all", label: "All" },
                        { value: "task-one", label: "Task 1" },
                        { value: "task-two", label: "Task 2" },
                    ],
                },
            },
            submissionsTable: {
                rows,
            },
        }),
        [rows, ieltsType, taskType]
    );

    /* ==================== PUBLIC API ==================== */
    // Returns the view data, loading and error states, and actions to update filters.
    return {
        viewData,
        isLoading,
        error,
        actions: {
            setIeltsType,
            setTaskType,
        },
    };
}

/* ========== Utilities (ViewModel-local only) ========== */
// Formats backend timestamps for UI display.
function formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}