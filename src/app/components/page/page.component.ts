import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  public currentName: string;
  public currentSurname: string;
  public pageSliderText = 'Página';

  public randomNames = ['Omar', 'Dedín', 'José', 'Karina', 'César', 'Leslie', 'Diego', 'Duncan'];
  public randomSurnames = ['Ascendoso', 'Liberato', 'Basurco', 'Liza', 'Delgado', 'Vierisha', 'Vásquez', 'Pérez'];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.currentName = '';
    this.currentSurname = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentName = params.name;
      this.currentSurname = params.surname;
    });
  }

  redirection() {
    let randomName = this.randomNames[this.getRandomInt(8)];
    let randomSurname = this.randomSurnames[this.getRandomInt(8)];
    this.router.navigate(['/page-test', randomName, randomSurname]);
  }

  getRandomInt(maxValue: number) {
    return Math.floor(Math.random() * maxValue);
  }
}
