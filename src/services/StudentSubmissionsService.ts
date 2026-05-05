/**
 * studentSubmissionsService
 *
 * Service-layer abstraction responsible for retrieving
 * raw student submission data from the backend.
 *
 * TODO:
 * Replace with a real API call when the backend endpoint is finalised.
 */

type GetStudentSubmissionsParams = {
  userId: string;
  ieltsType?: string;
  taskType?: string;
};

export async function getStudentSubmissions(
  _params: GetStudentSubmissionsParams
): Promise<any[]> {
  // Stub: return an empty list to allow UI and hooks to integrate
  return [];
}