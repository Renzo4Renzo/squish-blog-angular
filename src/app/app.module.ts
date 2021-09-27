import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { appRoutingProviders, routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { TestComponent } from "./components/test-component/test.component";
import { PruebasComponent } from "./components/pruebas/pruebas.component";
import { HeaderComponent } from "./components/header/header.component";
import { SliderComponent } from "./components/slider/slider.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { BlogComponent } from "./components/blog/blog.component";
import { FormComponent } from "./components/form/form.component";
import { PageComponent } from "./components/page/page.component";
import { MovieComponent } from "./components/movie/movie.component";
import { from } from "rxjs";
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PruebasComponent,
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
  ],
  imports: [BrowserModule, routing],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
