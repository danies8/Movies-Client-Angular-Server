import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../loginUser/auth.guard';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieResolver } from './movie-edit/movie-resolver.service';
import { MovieEditGuard } from './movie-edit/movie-edit.guard';
import { ImageUrlValidateDirective } from '../shared/customValidators/imageUrlValidator';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MovieListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/edit',
        canActivate: [AuthGuard],
        component: MovieEditComponent,
        canDeactivate: [MovieEditGuard],
        resolve: { resolvedData: MovieResolver },
      }
           
    ])
  ],
declarations: [
  MovieListComponent,
  MovieEditComponent,
  ImageUrlValidateDirective

]
})
export class MovieModule { }
