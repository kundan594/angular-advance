import { Component, OnInit, OnDestroy, DestroyRef, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskNgRxService } from '../../services/task-ngrx.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Signal<Task[] | undefined>;
  completedCount$: Signal<number | undefined>;
  totalCount$: Signal<number | undefined>;
  pendingCount$: Signal<number | undefined>;

  Math = Math;

  filter = signal<'all'|'completed'|'pending'>('all');
  filterLabel = computed(() => {
    switch(this.filter()){
      case 'completed':
        return 'Showing completed tasks';
      case 'pending':
        return 'Showing pending tasks';
      default:
        return 'Showing all tasks';
    }
  })

  filteredTasks: Signal<Task[] | undefined> = computed(() => {
    const allTasks = this.tasks$();
    const currentFilter = this.filter();

    console.log('current filter - ', this.filter())

    if(!allTasks) return undefined;

    switch(currentFilter){
      case 'completed':
        return allTasks.filter(task => task.completed);
      case 'pending':
        return allTasks.filter(task => !task.completed);
        default:
          return allTasks;
    }
  })

  constructor(
    private taskService: TaskNgRxService
  ) {
    this.tasks$ = toSignal(taskService.tasks$, {initialValue: []});
    this.completedCount$ = toSignal(taskService.completedCount$, {initialValue: 0});
    this.totalCount$ =  toSignal(taskService.totalCount$, {initialValue: 0});
    this.pendingCount$ = toSignal(taskService.pendingCount$, {initialValue: 0});
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