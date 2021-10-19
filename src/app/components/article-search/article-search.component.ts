import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css'],
  providers: [ArticleService],
})
export class ArticleSearchComponent implements OnInit {
  public searchSliderText = 'Resultados de Búsqueda';
  public sliderSize = 'small';

  public searchString: string = '';
  public articleList: Array<Article> = [];
  public errorType: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.searchString = params['searchString'];
      this.articleList = [];
      this.articleService.searchArticle(this.searchString).subscribe(
        (response) => {
          if (response.articles) {
            this.articleList = response.articles;
            this.errorType = -1;
          }
        },
        (error) => {
          if (error.error.message == '¡No hay artículos que coincidan con la búsqueda!') {
            this.errorType = 2;
          } else if (error.message.includes('Unknown Error')) {
            this.errorType = 0;
          } else console.log(error);
        }
      );
    });
  }
}
