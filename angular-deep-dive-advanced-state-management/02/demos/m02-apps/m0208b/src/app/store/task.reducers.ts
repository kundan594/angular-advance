import { createReducer, on } from "@ngrx/store";
import { TaskState } from ".";
import * as TaskActions from './task.actions';

export const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
}

export const taskReducer = createReducer(
    initialState,

    on(TaskActions.loadTasks, (state, {tasks}) => ({
        ...state,
        tasks,
        loading:false,
        error: null
    })),

    on(TaskActions.addTask, (state, {task}) => ({
        ...state,
        tasks: [...state.tasks, task],
        loading: false,
        error: null
    })),

    on(TaskActions.toggleTask, (state, {taskId}) => ({
        ...state,
        tasks: state.tasks.map(task => 
            task.id === taskId 
            ? {...task, completed: !task.completed} : task),
        loading: false,
        error: null
    })),

    on(TaskActions.deleteTask, (state, {taskId}) => ({
        ...state,
        tasks: state.tasks.filter(task => task.id != taskId),
        loading: false,
        error: null
    }))
)