import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <!-- because we are returning an observable we need to add
          the $ suffix and the async pipe
          (async pipe essentially subscribes directly from the template) -->
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"> </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  // pizza: Pizza; // changing pizza over to an observable
  pizza$: Observable<Pizza>; // pizza to pizza$ (also set to Observable) and update in template as well
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // because we're now selecting data from the store we will add the $ suffix
    // assign the selector
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      // tap is used because do is a js reserved word
      tap((pizza: Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists ? pizza.toppings.map(topping => topping.id) : []; // clear state if not exist
        this.store.dispatch(new fromStore.VisualiseToppings(toppings));
      })
    ); // we're using a query via our selector
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}
