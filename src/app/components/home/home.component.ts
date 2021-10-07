import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public title: string;
  public homeSliderText = '¡Bienvenidos a mi página web con Angular!';

  constructor() {
    this.title = 'Últimos Artículos';
  }

  ngOnInit(): void {}
}
