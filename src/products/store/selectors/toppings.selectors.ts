import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

// reference to entities, pass in getToppingState from above
export const getToppingEntities = createSelector(
  getToppingState,
  fromToppings.getToppingEntities
);

// pass in getToppingEntities from above
export const getAllToppings = createSelector(
  getToppingEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

// pass in getToppingState from above
export const getToppingsLoaded = createSelector(
  getToppingState,
  fromToppings.getToppingsLoaded
);

// pass in getToppingState from above
export const getToppingsLoading = createSelector(
  getToppingState,
  fromToppings.getToppingsLoading
);
