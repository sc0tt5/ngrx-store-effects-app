import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
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

export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizzas state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getAllPizzas = createSelector(
  getPizzaState,
  fromPizzas.getPizzas
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
