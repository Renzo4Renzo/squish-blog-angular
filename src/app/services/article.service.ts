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

  testing() {
    return '¡Soy el servicio con cebolla!';
  }

  getArticles(): Observable<any> {
    return this.http.get(this.baseURL + 'article_list');
  }
}
