import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services/pizzas.service';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.pipe(ofType(pizzaActions.LOAD_PIZZAS)).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.pipe(ofType(pizzaActions.CREATE_PIZZA)).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza =>
      this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(
            pizza => new pizzaActions.CreatePizzaSuccess(pizza),
            catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
          )
        )
    )
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(ofType(pizzaActions.UPDATE_PIZZA)).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza =>
      this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(
            pizza => new pizzaActions.UpdatePizzaSuccess(pizza),
            catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
          )
        )
    )
  );
}
