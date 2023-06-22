import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

// TODO: increase time to wait between data fetches
export const useAssignmentsAvailForReview = () => {
  return useQuery({
    queryKey: ["assignments-available-for-review"],
    queryFn: WaniKaniAPI.getAssignmentsAvailForReview,
    select: (data) => flattenData(data),
  });
};