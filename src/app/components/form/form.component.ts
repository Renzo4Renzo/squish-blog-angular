import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public formSliderText = 'Formulario';
  public sliderSize = 'small';

  public person: any;
  public testText: string = '';

  constructor() {
    this.person = {
      name: '',
      surname: '',
      biography: '',
      gender: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.person);
  }

  /* isClicked() {
    alert('Sí, le diste click');
  }

  isLeft() {
    alert('Sí, has salido, malvado');
  }

  isEnterPressed() {
    alert('Sí, presionaste ENTER');
  } */
}
