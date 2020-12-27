import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { MemberEditComponent } from './member-edit.component';


@Injectable({
  providedIn: 'root'
})
export class MemberEditGuard implements CanDeactivate<MemberEditComponent>  {

  canDeactivate(component: MemberEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const memberName = component.member.member.name  || 'New Member';
      return confirm(`Navigate away and lose all changes to ${memberName}?`);
    }
    return true;
  }

}
