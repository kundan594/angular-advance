import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNotificationsComponent } from './task-notifications.component';

describe('TaskNotificationsComponent', () => {
  let component: TaskNotificationsComponent;
  let fixture: ComponentFixture<TaskNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
