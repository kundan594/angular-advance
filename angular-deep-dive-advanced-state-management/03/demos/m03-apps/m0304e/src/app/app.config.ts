import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { taskReducer } from './store/task.reducers';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      tasks: taskReducer
    }),
    provideEffects(TaskEffects),
    provideRouter(routes),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
