import { Task } from "../models/task.model"

export interface AppState {
    tasks: TaskState;
}

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}