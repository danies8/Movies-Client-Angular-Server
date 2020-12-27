import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieEditComponent } from './movie-edit.component';


@Injectable({
  providedIn: 'root'
})
export class MovieEditGuard implements CanDeactivate<MovieEditComponent>  {

  canDeactivate(component: MovieEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const movieName = component.movie.movieData.name  || 'New Movie';
      return confirm(`Navigate away and lose all changes to ${movieName}?`);
    }
    return true;
  }

}
