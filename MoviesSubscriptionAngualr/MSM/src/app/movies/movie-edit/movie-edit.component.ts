import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovieResponse } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  @ViewChild("editForm") editForm: NgForm;

  pageTitle = 'Movie Edit';
  errorMessage: string;


  get isDirty(): boolean {
    return this.editForm.dirty ? true : false;
  }

  private currentMovie: IMovieResponse;
  get movie(): IMovieResponse {
    return this.currentMovie;
  }
  set movie(value: IMovieResponse) {
    this.currentMovie = value;
  }

   constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: IMovieResponse = data['resolvedData'];
      this.errorMessage = resolvedData.errorMessage;
      this.onMovieRetrieved(resolvedData);
    });
  }
  onMovieRetrieved(movie: IMovieResponse): void {

    this.movie = movie;
 
    if (!this.movie) {
      this.pageTitle = 'No movie found';
    } else {
      if (+this.movie.movieData._id === 0) {
        this.pageTitle = 'Add movie';
      } else {
        this.pageTitle = `Edit movie: ${this.movie.movieData.name}`;
       }
    }
  }


  reset(): void {
    this.editForm.reset();
  }

  saveMovie(): void {
    if (this.editForm.form.valid) {
  
      if (+this.movie.movieData._id === 0) {
        this.movieService.createMovie(this.movie).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.movieService.updateMovie(this.movie).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    this.reset();
     this.router.navigate(['/movies']);
  }
}
