import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/Article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService],
})
export class BlogComponent implements OnInit {
  public blogSliderText = 'Blog';
  public sliderSize = 'small';

  public articles: Array<Article> = [];
  public errorMessage: string = '';

  public baseURL: string;

  constructor(private articleService: ArticleService) {
    this.baseURL = Global.url;
  }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      (response) => {
        if (response.articles) {
          this.articles = response.articles;
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
