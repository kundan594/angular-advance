import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task.model";

const taskActions = {
    loadTasks: '[Tasks] Load Tasks',
    addTask: '[Tasks] Add New Task',
    toggleTask: '[Tasks] Toggle Task',
    deleteTask: '[Tasks] Delete Task'
}

export const loadTasks = createAction(
    taskActions.loadTasks,
    props<{tasks: Task[]}>()
)

export const addTask = createAction(
    taskActions.addTask,
    props<{task: Task}>()
)

export const toggleTask = createAction(
    taskActions.toggleTask,
    props<{taskId: string}>()
)

export const deleteTask = createAction(
    taskActions.deleteTask,
    props<{taskId: string}>()
)
