import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../movie-data.service';
import { Movie } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private movieDataService: MovieDataService) {}

  getAll() {
    this.movieDataService
      .getAll()
      .subscribe((movies) => (this.movies = movies));
  }

  ngOnInit(): void {
    this.getAll();
  }

  onDelete(movie: Movie) {
    if (window.confirm(`Are you sure to delete movie "${movie.name}"?`)) {
      this.movieDataService.delete(movie._id).subscribe(() => this.getAll());
    }
  }
}
