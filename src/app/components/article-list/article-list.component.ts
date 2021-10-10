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
  @Input() errorType!: number;
  public baseURL: string;

  constructor() {
    this.baseURL = Global.url;
  }

  ngOnInit(): void {}
}
