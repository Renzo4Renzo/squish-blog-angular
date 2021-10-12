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
  public errorType: number = -1;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
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
