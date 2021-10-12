import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  @Input() articles!: Array<Article>;

  /* 
    ErrorType:
    0: Error al consumir el API REST
    1: No hay artículos guardados en la base de datos
    2: No hay artículos que coincidan con la búsqueda
    -1: Sin error 
  */
  @Input() errorType!: number;
  public baseURL: string;

  constructor() {
    this.baseURL = Global.url;
  }

  ngOnInit(): void {}
}
