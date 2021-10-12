import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
  providers: [ArticleService],
})
export class ArticleCreateComponent implements OnInit {
  public articleToCreate: Article;
  public selectedFile!: File;
  public isSaving: boolean = false;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.articleToCreate = new Article('', '', '', '', null);
  }

  ngOnInit(): void {}

  submitArticle() {
    this.isSaving = true;
    if (this.selectedFile) {
      this.articleService.uploadArticleImage(this.selectedFile).subscribe(
        (response) => {
          this.articleToCreate.image = response.image;
          this.submitContent();
        },
        (error) => {
          if (error.error.message == '¡El peso máximo permitido de los archivos es de 1MB!') {
            this.swalErrorMessage(error);
          } else if (
            error.error.message ==
            '¡La extensión de la imagen no es válida!\nLas extensiones válidas son: .png, .jpg, .jpeg, .gif'
          ) {
            this.swalErrorMessage(error);
          } else console.log(error);
          this.isSaving = false;
        }
      );
    } else {
      this.submitContent();
    }
  }

  submitContent() {
    this.articleService.createArticle(this.articleToCreate).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          this.articleToCreate = response.article;
          Swal.fire({
            icon: 'success',
            text: '¡El artículo se creó correctamente!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });
          this.router.navigate(['/blog']);
        }
        this.isSaving = false;
      },
      (error) => {
        if (error.error.message == '¡No se pudo conectar con la base de datos!') {
          this.swalErrorMessage(error);
        } else console.log(error);
        this.isSaving = false;
      }
    );
  }

  swalErrorMessage(error: any) {
    Swal.fire({
      icon: 'error',
      text: error.error.message,
      confirmButtonColor: '#179613',
      confirmButtonText: 'Aceptar',
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
