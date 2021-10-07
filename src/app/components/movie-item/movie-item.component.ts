import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input()
  movie!: Movie;
  @Output() selectFavorite = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  chooseMovie(movie: Movie) {
    this.selectFavorite.emit({ movie: movie });
  }
}
