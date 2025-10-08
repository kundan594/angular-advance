import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "../models/task.model";
import { taskAdapter, TaskState } from "./task.reducers";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

const {selectAll, selectEntities, selectIds, selectTotal} = taskAdapter.getSelectors();

export const selectAllTasks = createSelector(
    selectTaskState,
    selectAll
)

export const selectTaskEntities = createSelector(
    selectTaskState,
    selectEntities
  );
  
  export const selectTaskIds = createSelector(
    selectTaskState,
    selectIds
  );
  
  export const selectTaskTotal = createSelector(
    selectTaskState,
    selectTotal
  );
  
  export const selectCompletedTasksCount = createSelector(
    selectAllTasks,
    tasks => tasks.filter(t => t.completed).length
  );
  
  export const selectPendingTasksCount = createSelector(
    selectAllTasks,
    tasks => tasks.filter(t => !t.completed).length
  );
  
  export const selectLoading = createSelector(
    selectTaskState,
    (state) => state.loading
  );
  
  export const selectError = createSelector(
    selectTaskState,
    (state) => state.error
  );