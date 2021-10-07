import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieService],
})
export class MovieComponent implements OnInit {
  public title: string;
  public movies: Array<Movie>;

  public movieSliderText = 'Películas';
  public sliderSize = 'small';

  public favoriteMovie!: Movie;
  public someDate: Date;

  constructor(private movieService: MovieService) {
    this.title = 'Componente Movies Mobeck';
    this.movies = this.movieService.getMovies();
    this.someDate = new Date(2021, 8, 16);
  }

  ngOnInit() {
    console.log(this.movies);
    console.log('Componente iniciado!');
    console.log(this.movieService.sayHello());
  }

  ngDoCheck() {
    console.log('Do check lanzado!');
  }

  changeTitle() {
    this.title = 'El titulo ha sido cambiado!';
  }

  ngOnDestroy() {
    console.log('El componente se va a eliminar!');
  }

  showFavorite(event: any) {
    this.favoriteMovie = event.movie;
  }
}
