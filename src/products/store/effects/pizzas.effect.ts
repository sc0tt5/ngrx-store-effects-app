import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
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

  // this effect will enable us to auto redirect to the newly created pizza
  @Effect()
  createPizzaSuccess$ = this.actions$.pipe(ofType(pizzaActions.CREATE_PIZZA_SUCCESS)).pipe(
    map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
    map(
      pizza =>
        new fromRoot.Go({
          path: ['/products', pizza.id]
        })
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

  @Effect()
  removePizza$ = this.actions$.pipe(ofType(pizzaActions.REMOVE_PIZZA)).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap(pizza =>
      this.pizzaService
        .removePizza(pizza)
        .pipe(
          map(
            () => new pizzaActions.RemovePizzaSuccess(pizza),
            catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
          )
        )
    )
  );

  // this effect will enable us to auto redirect when delete or update
  @Effect()
  handlePizzaSuccess$ = this.actions$
    .pipe(ofType(pizzaActions.UPDATE_PIZZA_SUCCESS, pizzaActions.REMOVE_PIZZA_SUCCESS))
    .pipe(
      map(
        pizza =>
          new fromRoot.Go({
            path: ['/products']
          })
      )
    );
}
