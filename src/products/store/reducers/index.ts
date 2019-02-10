import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

// products interface from pizza state
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

// register reducers
// ActionReducerMap<ProductsState> type checks
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
