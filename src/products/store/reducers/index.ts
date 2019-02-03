import { ActionReducerMap } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

// products interface from pizza state
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

// register reducers
// ActionReducerMap<ProductsState> type checks
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};
