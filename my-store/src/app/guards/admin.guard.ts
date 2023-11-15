import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adminGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$
    .pipe(
      map(user => {
        if(user?.role==='admin'){
          return true;
        }else{
          router.navigate(['/home'])
          return false;
        }
      })
    )

};
