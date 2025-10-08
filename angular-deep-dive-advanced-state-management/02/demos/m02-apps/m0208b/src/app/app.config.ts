import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStore} from '@ngrx/store';

import { routes } from './app.routes';
import { taskReducer } from './store/task.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      tasks: taskReducer
    }),
    provideRouter(routes)
  ]
};
