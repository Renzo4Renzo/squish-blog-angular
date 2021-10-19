import { Component, OnInit, ViewChild } from '@angular/core';
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
  public isSaving: boolean = false;

  public imagePreview: string = '';
  public selectedFile: File | undefined;

  @ViewChild('inputImage')
  public inputImage: any = null;

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
          this.resetFile();
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
        this.resetFile();
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
    this.extractBase64(this.selectedFile).then(
      (image: any) => {
        this.imagePreview = image.base;
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }

  extractBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const imageReader = new FileReader();
        imageReader.readAsDataURL($event);
        imageReader.onload = () => {
          if (imageReader.result) {
            if (imageReader.result.toString().includes('data:image')) {
              resolve({
                base: imageReader.result,
              });
            } else {
              reject('¡El documento no es una imagen!');
            }
          } else reject('¡No se pudo leer su documento!');
        };
        imageReader.onerror = (error) => {
          reject('¡Error al intentar leer el documento!');
        };
      } catch (error) {
        return console.log(error);
      }
    });

  resetFile() {
    if (this.inputImage) this.inputImage.nativeElement.value = '';
    this.imagePreview = '';
    this.selectedFile = undefined;
  }
}
