import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as TaskSelectors from '../store/task.selectors';
import * as TaskActions from '../store/task.actions';
import { Task, TaskFormData } from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskNgRxService {

    constructor(private store: Store) { }

    public get tasks$() {
        return this.store.select(TaskSelectors.selectAllTasks);
    }

    public get completedCount$() {
        return this.store.select(TaskSelectors.selectCompletedTasksCount);
    }

    public get pendingCount$() {
        return this.store.select(TaskSelectors.selectPendingTasksCount);
    }

    public get totalCount$() {
        return this.store.select(TaskSelectors.selectTasksCount);
    }

    public get loading$() {
        return this.store.select(TaskSelectors.selectLoading);
    }

    public get error$() {
        return this.store.select(TaskSelectors.selectError);
    }


    loadTasks(): void {

        const sampleTasks: Task[] = [
            {
                id: '1',
                title: 'Learn Angular State Management',
                description: 'Complete the course on Angular state management patterns',
                completed: false,
                priority: 'high',
                createdAt: new Date(),
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            },
            {
                id: '2',
                title: 'Build TaskFlow App',
                description: 'Implement the task manager with different state management approaches',
                completed: false,
                priority: 'high',
                createdAt: new Date(),
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
            },
            {
                id: '3',
                title: 'Review Code',
                description: 'Go through the implementation and understand the patterns',
                completed: true,
                priority: 'medium',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
            }
        ];

        this.store.dispatch(TaskActions.loadTasks({ tasks: sampleTasks }));

    }


    addTask(taskData: TaskFormData): void {
        const newTask: Task = {
            id: this.generateId(),
            ...taskData,
            completed: false,
            createdAt: new Date()
        };

        this.store.dispatch(TaskActions.addTask({ task: newTask }));
    }

    deleteTask(id: string): void {
        this.store.dispatch(TaskActions.deleteTask({ taskId: id }));
    }

    toggleTaskComplete(id: string): void {
        this.store.dispatch(TaskActions.toggleTask({ taskId: id }));
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }


}