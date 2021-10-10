import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService],
})
export class BlogComponent implements OnInit {
  public blogSliderText = 'Blog';
  public sliderSize = 'small';

  public articleList: Array<Article> = [];
  public errorMessage: string = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
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
