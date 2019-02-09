import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
        [toppings]="toppings"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise"> </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  // pizza: Pizza; // changing pizza over to an observable
  pizza$: Observable<Pizza>; // pizza to pizza$ and update in template as well (also set to Observable)
  visualise: Pizza;
  toppings: Topping[];

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // because we're now selecting data from the store we will at the $ suffix
    // assign the selector
    this.pizza$ = this.store.select(fromStore.getSelectedPizza); // we're using a query via our selector
  }

  onSelect(event: number[]) {}

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
