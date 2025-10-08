import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskFormData } from '../../models/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  formData: TaskFormData = {
    title: '',
    description: '',
    priority: 'medium'
  };

  constructor(private taskService: TaskService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.taskService.formData$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(formData => {
      this.formData = {...formData}
    })
  }

  onSubmit(): void {
    if (this.formData.title.trim()) {
      this.taskService.addTask(this.formData);
      this.taskService.resetFormData();
    }
  }

  onDueDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.formData.dueDate = input.value ? new Date(input.value) : undefined;
  }
}