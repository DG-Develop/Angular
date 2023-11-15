import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exitGuard: CanDeactivateFn<OnExit> = (component, currentRoute, currentState, nextState) => {


  return component.onExit ? component.onExit() : true;
};
