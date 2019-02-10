import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
  constructor(private actions$: Actions, private toppingService: fromServices.ToppingsService) {}

  @Effect()
  loadToppings$ = this.actions$.pipe(ofType(toppingsActions.LOAD_TOPPINGS)).pipe(
    switchMap(() => {
      return this.toppingService.getToppings().pipe(
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
