import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from ".";
import { Task } from "../models/task.model";

export const selectTasksState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
    selectTasksState,
    (state: TaskState) => state.tasks
)

export const selectTasksCount = createSelector(
    selectAllTasks,
    (state: Task[]) => state.length
)

export const selectCompletedTasksCount = createSelector(
    selectAllTasks,
    (state: Task[]) => state.filter(t => t.completed).length
)

export const selectPendingTasksCount = createSelector(
    selectAllTasks,
    (state: Task[]) => state.filter(t => !t.completed).length
)

export const selectTasksByPriority = (priority: 'low' | 'medium' | 'high') => createSelector(
    selectAllTasks,
    (state: Task[]) => state.filter(t => t.priority == priority)
) 