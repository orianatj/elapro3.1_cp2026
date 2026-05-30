import { useMutation } from "@tanstack/react-query";
import { createQuestion } from "../services/questionsApi.ts";

export function useQuestion() {
  return useMutation({
    mutationFn: ({ ieltsType, taskType, questionText }: {
      ieltsType: string;
      taskType: string;
      questionText: string;
    }) => createQuestion(ieltsType, taskType, questionText),
  });
}