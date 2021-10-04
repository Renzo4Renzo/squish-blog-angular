import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  public title: string;
  public movies: Array<Movie>;

  constructor() {
    this.title = 'Componente Movies Mobeck';
    this.movies = [
      new Movie('Spidy 4', 2019, 'https://sm.ign.com/ign_es/screenshot/default/spider-man-sin-camino-a-casa_uf48.jpg'),
      new Movie('The Advangers', 2018, 'https://www.meme-arsenal.com/memes/c424b568c008abf8a3eee0f49455b532.jpg'),
      new Movie('Bitman vs Botman', 2015, 'https://i.redd.it/lo744jp2hyj01.jpg'),
      new Movie('Pixie Pixie', 2012, 'https://i.blogs.es/e770ec/pixels/1366_2000.jpg'),
    ];
  }

  ngOnInit() {
    console.log(this.movies);
    console.log('Componente iniciado!');
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
}
