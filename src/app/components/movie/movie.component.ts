import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  public title: string;

  constructor() {
    this.title = "Componente Movies Mobeck";
    console.log("Constructor lanzado!");
  }

  ngOnInit() {
    console.log("Componente iniciado!");
  }

  ngDoCheck() {
    console.log("Do check lanzado!");
  }

  changeTitle() {
    this.title = "El titulo ha sido cambiado!";
  }

  ngOnDestroy() {
    console.log("El componente se va a eliminar!");
  }
}
