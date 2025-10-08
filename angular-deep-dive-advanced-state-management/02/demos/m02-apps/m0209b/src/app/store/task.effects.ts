import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { delay, mergeMap, of } from "rxjs";

@Injectable()
export class TaskEffects {

    private actions$ = inject(Actions);

    addTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskActions.addTask),
            mergeMap(actions => {
                const shouldFail = false;
                if (shouldFail) {
                    return of(TaskActions.addTaskFailure({ error: 'Failed to add a task (simulated)' })).pipe((delay(2000)))
                }

                return of(TaskActions.addTaskSuccess({ task: actions.task })).pipe(delay(2000));
            })
        )
    })

}