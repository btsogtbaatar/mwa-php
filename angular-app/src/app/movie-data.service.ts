import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = `http://localhost:3000/api/movies`;

  getAll() {
    return this.httpClient.get<Movie[]>(this.baseUrl);
  }

  getOne(_id: string) {
    return this.httpClient.get<Movie>(`${this.baseUrl}/${_id}`);
  }

  create(movie: Movie) {
    return this.httpClient.post<Movie>(this.baseUrl, movie);
  }

  update(movie: Movie) {
    return this.httpClient.put<Movie>(this.baseUrl, movie);
  }

  delete(_id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/${_id}`);
  }
}
