import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskFormData } from '../../models/task.model';
import { TaskNgRxService } from '../../services/task-ngrx.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  formData: TaskFormData = {
    title: '',
    description: '',
    priority: 'medium'
  };

  loading$: Observable<boolean>;
  error$: Observable<string | null>

  constructor(private taskService: TaskNgRxService) {
    this.loading$ = this.taskService.loading$;
    this.error$ = this.taskService.error$;
  }

  onSubmit(): void {
    if (this.formData.title.trim()) {
      this.taskService.addTask(this.formData);
      this.resetForm();
    }
  }

  onDueDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.formData.dueDate = input.value ? new Date(input.value) : undefined;
  }

  resetForm(): void {
    this.formData = {
      title: '',
      description: '',
      priority: 'medium'
    };
  }
}