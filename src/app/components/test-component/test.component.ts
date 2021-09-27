import { Component } from "@angular/core";

@Component({
  selector: "test",
  templateUrl: "./test.component.html",
})
export class TestComponent {
  public title: string;
  public comment: string;
  public year: number;
  public showMovies: boolean;

  constructor() {
    this.title = "Soy el Faraon, OH ME VENGOOO W2";
    this.comment = "Yo todos los días siempre me bango W2";
    this.year = 2021;
    this.showMovies = true;
    // console.log("Componente TestComponent cargado!");
    // console.log(this.title, this.comment, this.year);
  }

  hideMovies() {
    this.showMovies = false;
  }
}
