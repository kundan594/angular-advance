import { Component, OnInit, OnDestroy, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskNgRxService } from '../../services/task-ngrx.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  completedCount$: Observable<number>;
  totalCount$: Observable<number>;
  pendingCount$: Observable<number>;

  Math = Math;

  constructor(
    private taskService: TaskNgRxService
  ) {
    this.tasks$ = taskService.tasks$;
    this.completedCount$ = taskService.completedCount$;
    this.totalCount$ = taskService.totalCount$;
    this.pendingCount$ = taskService.pendingCount$;
  }

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  toggleComplete(taskId: string): void {
    this.taskService.toggleTaskComplete(taskId);
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  getPriorityClass(priority: Task['priority']): string {
    switch (priority) {
      case 'high':
        return 'badge bg-danger';
      case 'medium':
        return 'badge bg-warning text-dark';
      case 'low':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }

  getPriorityIcon(priority: Task['priority']): string {
    switch (priority) {
      case 'high':
        return 'bi-exclamation-triangle-fill';
      case 'medium':
        return 'bi-exclamation-circle';
      case 'low':
        return 'bi-check-circle';
      default:
        return 'bi-circle';
    }
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate) return false;
    return new Date() > task.dueDate && !task.completed;
  }

  getDaysUntilDue(task: Task): number {
    if (!task.dueDate) return 0;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
} 