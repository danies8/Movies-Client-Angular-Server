import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserEditComponent } from './user-edit.component';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanDeactivate<UserEditComponent>  {

  canDeactivate(component: UserEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const userName = component.user.results.userData.firstName + " "
       component.user.results.userData.lastName || 'New User';
      return confirm(`Navigate away and lose all changes to ${userName}?`);
    }
    return true;
  }

}
