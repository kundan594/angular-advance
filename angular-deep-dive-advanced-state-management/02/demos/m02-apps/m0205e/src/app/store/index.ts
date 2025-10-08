import { ActionReducerMap } from "@ngrx/store";
import { Task } from "../models/task.model"
import { taskReducer } from "./task.reducer";

export interface AppState {
    tasks: TaskState;
}

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export const reducers: ActionReducerMap<AppState> = {
    tasks: taskReducer
}