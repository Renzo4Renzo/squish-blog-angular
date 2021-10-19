import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingProviders, routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
//import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { TestComponent } from './components/test-component/test.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormComponent } from './components/form/form.component';
import { PageComponent } from './components/page/page.component';
import { MovieComponent } from './components/movie/movie.component';
import { ErrorComponent } from './components/error/error.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { isEvenPipe } from './pipes/isEven.pipe';
import { FormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleSearchComponent } from './components/article-search/article-search.component';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    FormComponent,
    PageComponent,
    MovieComponent,
    ErrorComponent,
    MovieItemComponent,
    isEvenPipe,
    ArticleListComponent,
    ArticleComponent,
    ArticleSearchComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
  ],
  imports: [BrowserModule, routing, FormsModule, HttpClientModule, MomentModule, /*AngularFileUploaderModule*/],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
