import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService],
})
export class HomeComponent implements OnInit {
  public title: string;
  public homeSliderText = '¡Bienvenidos a SquishAngular!';

  public articleList: Array<Article> = [];
  public errorMessage: string = '';

  constructor(private articleService: ArticleService) {
    this.title = 'Últimos Artículos';
  }

  ngOnInit(): void {
    this.articleService.getArticles('latestFive').subscribe(
      (response) => {
        if (response.articles) {
          this.articleList = response.articles;
        } else {
          this.errorMessage = '¡No hay artículos que mostrar!';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
