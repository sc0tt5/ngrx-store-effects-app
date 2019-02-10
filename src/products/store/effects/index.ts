// import individual effects
import { PizzasEffects } from './pizzas.effect';
import { ToppingsEffects } from './toppings.effect';

// export property as effects
export const effects: any[] = [PizzasEffects, ToppingsEffects];

export * from './pizzas.effect';
export * from './toppings.effect';
