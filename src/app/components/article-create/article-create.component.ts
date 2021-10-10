import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
  providers: [ArticleService],
})
export class ArticleCreateComponent implements OnInit {
  public articleToCreate: Article;
  public requestStatus: string = '';

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.articleToCreate = new Article('', '', '', '', null);
  }

  ngOnInit(): void {}

  submitArticle() {
    this.articleService.createArticle(this.articleToCreate).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          this.requestStatus = 'success';
          this.articleToCreate = response.article;
          this.router.navigate(['/blog']);
        } else {
          this.requestStatus = 'error';
        }
      },
      (error) => {
        console.log(error);
        this.requestStatus = 'error';
      }
    );
  }
}
