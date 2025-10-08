import { createReducer, on } from "@ngrx/store";
import * as TaskActions from './task.actions';
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Task } from "../models/task.model";

export const taskAdapter = createEntityAdapter<Task>();

export interface TaskState extends EntityState<Task> {
    loading: boolean,
    error: string | null
}

export const initialState: TaskState = taskAdapter.getInitialState({
    loading: false,
    error: null
})

export const taskReducer = createReducer(
    initialState,

    on(TaskActions.loadTasks, (state, { tasks }) => 
        taskAdapter.setAll(tasks, {...state, loading: false})
    ),

    on(TaskActions.addTask, (state, { task }) => 
        taskAdapter.addOne(task, state)
    ),

    on(TaskActions.toggleTask, (state, { taskId }) =>
        taskAdapter.updateOne({id: taskId, changes: {
            completed: !state.entities[taskId]?.completed
        }}, state)
    ),

    on(TaskActions.deleteTask, (state, { taskId }) => 
        taskAdapter.removeOne(taskId, state)
    )
)