import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-notifications.component.html',
  styleUrl: './task-notifications.component.css'
})
export class TaskNotificationsComponent  implements OnInit {
  currentNotification: string | null = null;

  constructor(
    private taskService: TaskService,
    private destroyRef: DestroyRef
  ) {}

   ngOnInit(): void {
    this.taskService.notification$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(notification => {
        this.currentNotification = notification;

        if(notification){
          setTimeout(() => this.removeNotification(), 5000);
        }
      });
   }

   removeNotification() : void{
    this.currentNotification = null;
   }
}
