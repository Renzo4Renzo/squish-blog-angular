import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { Global } from './global';

@Injectable()
export class ArticleService {
  public baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = Global.url;
  }

  getArticles(latestFive: any = null): Observable<any> {
    var articlelistURL = 'article_list';
    if (latestFive != null) {
      articlelistURL = 'article_list/last_five';
    }
    return this.http.get(this.baseURL + articlelistURL);
  }

  getArticle(articleId: string): Observable<any> {
    return this.http.get(this.baseURL + 'article/' + articleId);
  }

  searchArticle(searchString: string): Observable<any> {
    return this.http.get(this.baseURL + 'article_search/' + searchString);
  }

  createArticle(articleToCreate: Article): Observable<any> {
    let params = JSON.stringify(articleToCreate);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'article_save', params, { headers: headers });
  }

  updateArticle(articleId: string, articleToUpdate: Article): Observable<any> {
    let params = JSON.stringify(articleToUpdate);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.baseURL + 'article_update/' + articleId, params, { headers: headers });
  }

  deleteArticle(articleId: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.baseURL + 'article_delete/' + articleId, { headers: headers });
  }

  uploadArticleImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file0', image, image.name);
    return this.http.post(this.baseURL + 'article_img_upload', formData);
  }
}
