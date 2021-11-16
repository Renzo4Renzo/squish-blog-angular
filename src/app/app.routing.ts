//Importar los módulos del router de Angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes a los cuales se les quiere hacer una página exclusiva
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormComponent } from './components/form/form.component';
/* import { MovieComponent } from './components/movie/movie.component'; */
import { PageComponent } from './components/page/page.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleSearchComponent } from './components/article-search/article-search.component';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';

// Array de Rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/article/:id', component: ArticleComponent },
  { path: 'article/create', component: ArticleCreateComponent },
  { path: 'article/edit/:id', component: ArticleEditComponent },
  { path: 'search/:searchString', component: ArticleSearchComponent },
  { path: 'form', component: FormComponent },
  /* { path: 'movie', component: MovieComponent }, */
  { path: 'page-test', component: PageComponent },
  { path: 'page-test/:name/:surname', component: PageComponent },
  { path: '**', component: ErrorComponent },
];

//Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
