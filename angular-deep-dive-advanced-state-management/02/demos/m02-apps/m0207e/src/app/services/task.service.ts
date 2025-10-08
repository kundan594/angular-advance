import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskFormData } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Global state - task list
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    // Initialize with some sample data
    this.initializeSampleTasks();
  }

  private initializeSampleTasks(): void {
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
    this.tasksSubject.next(sampleTasks);
  }

  // CRUD Operations
  addTask(taskData: TaskFormData): void {
    const newTask: Task = {
      id: this.generateId(),
      ...taskData,
      completed: false,
      createdAt: new Date()
    };

    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(id: string): void {
    const currentTasks = this.tasksSubject.value;
    const filteredTasks = currentTasks.filter(task => task.id !== id);
    this.tasksSubject.next(filteredTasks);
  }

  toggleTaskComplete(id: string): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }



  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getCompletedTasksCount(): Observable<number> {
    return new Observable(observer => {
      this.tasks$.subscribe(tasks => {
        const completedCount = tasks.filter(task => task.completed).length;
        observer.next(completedCount);
      });
    });
  }

  getTasksByPriority(priority: Task['priority']): Observable<Task[]> {
    return new Observable(observer => {
      this.tasks$.subscribe(tasks => {
        const filteredTasks = tasks.filter(task => task.priority === priority);
        observer.next(filteredTasks);
      });
    });
  }
} 