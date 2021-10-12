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
  public errorType: number = -1;

  constructor(private articleService: ArticleService) {
    this.title = 'Últimos Artículos';
  }

  ngOnInit(): void {
    this.articleService.getArticles('latestFive').subscribe(
      (response) => {
        if (response.status == 'Ok') {
          this.articleList = response.articles;
        }
      },
      (error) => {
        //console.log(error);
        if (error.error.message) {
          this.errorType = 1;
          console.log(this.errorType);
        } else if (error.message.includes('Unknown Error')) {
          this.errorType = 0;
        } else console.log(error);
      }
    );
  }
}
