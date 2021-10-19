import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ArticleService],
})
export class FormComponent implements OnInit {
  public formSliderText = 'Contáctanos';
  public sliderSize = 'small';

  public person: any;
  public testText: string = '';
  public isSaving: boolean = false;

  constructor(private articleService: ArticleService, private router: Router) {
    this.person = {
      name: '',
      email: '',
      gender: '',
      question: '',
      description: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isSaving = true;
    this.articleService.sendEmail(this.person).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          Swal.fire({
            icon: 'success',
            html:
              '¡La información se envió correctamente! ¡En unos minutos tendrá la respuesta en su correo <b>' +
              this.person.email +
              '</b>!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });
        }
        this.isSaving = false;
        this.resetForm();
      },
      (error) => {
        if (error.error.message.includes('¡No se pudo enviar la respuesta al correo')) {
          Swal.fire({
            icon: 'error',
            html: '¡No se pudo enviar la respuesta al correo <b>' + this.person.email + '</b>!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            icon: 'error',
            html: '¡Ocurrió un error al enviar el correo! ¡Inténtalo más tarde!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });
          console.log(error);
        }
        this.isSaving = false;
        this.resetForm();
      }
    );
  }

  resetForm() {
    this.person = {
      name: '',
      email: '',
      gender: '',
      question: '',
      description: '',
    };
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
