import { create } from "zustand";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { createSelectors } from "../utils";

interface AssignmentQueueState {
  assignmentQueue: ReviewQueueItem[];
  currQueueIndex: number;
}

// TODO: fix updaeQueueItem not actually updating >:(
interface AssignmentQueueActions {
  updateQueueItem: (item: ReviewQueueItem) => void;
  setAssignmentQueueData: (queueData: ReviewQueueItem[]) => void;
  incrementCurrQueueIndex: () => void;
  addToAssignmentQueue: (reviewItem: ReviewQueueItem) => void;
  removeOldQueueItem: () => void;
  resetAll: () => void;
}
const initialState: AssignmentQueueState = {
  currQueueIndex: 0,
  assignmentQueue: [],
};

// TODO:rename variables so works with lessons quiz and review session
// TODO: remove isLoading here, just keep in review session queue file
const useAssignmentQueueStoreBase = create<
  AssignmentQueueState & AssignmentQueueActions
>((set, get) => ({
  ...initialState,

  incrementCurrQueueIndex: () =>
    set((state) => ({ currQueueIndex: state.currQueueIndex + 1 })),
  resetQueueIndex: () => set({ currQueueIndex: 0 }),
  updateQueueItem: (item) => {
    const lastIndexOfItem =
      get().assignmentQueue.length -
      1 -
      get()
        .assignmentQueue.slice()
        .reverse()
        .findIndex(
          (reviewItem) =>
            reviewItem.itemID === item.itemID &&
            reviewItem.review_type === item.review_type
        );
    // *testing
    console.log(
      "🚀 ~ file: useAssignmentQueueStore.ts:36 ~ lastIndexOfItem:",
      lastIndexOfItem
    );
    // *testing
    // let lastIndexOfItem =
    //     state.reviewQueue.length -
    //     1 -
    //     state.reviewQueue
    //       .slice()
    //       .reverse()
    //       .findIndex(
    //         (reviewItem) =>
    //           reviewItem.itemID === action.payload.itemID &&
    //           reviewItem.review_type === action.payload.review_type
    //       );
    //   let updatedQueueItem = Object.assign({}, action.payload);

    //   return {
    //     ...state,
    //     reviewQueue: [
    //       ...state.reviewQueue.slice(0, lastIndexOfItem),
    //       updatedQueueItem,
    //       ...state.reviewQueue.slice(lastIndexOfItem + 1),
    //     ],
    //   };

    let updatedQueueItem = Object.assign({}, item);
    // const updatedQueueItem = { ...item };
    // *testing
    console.log(
      "🚀 ~ file: useAssignmentQueueStore.ts:75 ~ updatedQueueItem:",
      updatedQueueItem
    );
    // *testing

    set((state) => ({
      ...state,
      assignmentQueue: [
        ...state.assignmentQueue.slice(0, lastIndexOfItem),
        updatedQueueItem,
        ...state.assignmentQueue.slice(lastIndexOfItem + 1),
      ],
    }));
  },
  removeReviewItem: () => {
    const indexToRemove = get().currQueueIndex;

    set((state) => ({
      ...state,
      assignmentQueueData: [
        ...state.assignmentQueue.slice(0, indexToRemove),
        ...state.assignmentQueue.slice(indexToRemove + 1),
      ],
    }));
  },

  setAssignmentQueueData: (queueData: ReviewQueueItem[]) => {
    set((state) => ({
      ...state,
      assignmentQueue: queueData,
    }));
  },
  addToAssignmentQueue(reviewItem) {
    set((state) => ({
      ...state,
      assignmentQueue: [...state.assignmentQueue, reviewItem],
    }));
  },
  removeOldQueueItem() {
    const indexToRemove = get().currQueueIndex;

    set((state) => ({
      ...state,
      assignmentQueueData: [
        ...state.assignmentQueue.slice(0, indexToRemove),
        ...state.assignmentQueue.slice(indexToRemove + 1),
      ],
    }));
  },
  resetAll: () => {
    set(initialState);
  },
}));

export const useAssignmentQueueStore = createSelectors(
  useAssignmentQueueStoreBase
);
