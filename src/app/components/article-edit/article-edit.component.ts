import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {
  public articleToUpdate: Article;
  public isSaving: boolean = false;
  public baseURL: string = Global.url;

  public imagePreview: string = '';
  public selectedFile: File | undefined;

  @ViewChild('inputImage')
  public inputImage: any = null;

  public oldImageHidden: Boolean = false;
  public oldImagePath: string = '';
  public oldImageExists: Boolean = false;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.articleToUpdate = new Article('', '', '', '', null);
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.articleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            this.articleToUpdate = response.article;
          } else {
            console.log('¡Oh no!¡El artículo que buscas no existe!');
            this.router.navigate(['/home']);
          }
          if (this.articleToUpdate.image) {
            this.oldImagePath = this.articleToUpdate.image;
            this.oldImageExists = true;
          }
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/home']);
        }
      );
    });
  }

  submitArticle() {
    this.isSaving = true;
    if (this.selectedFile) {
      this.articleService.uploadArticleImage(this.selectedFile).subscribe(
        (response) => {
          this.articleToUpdate.image = response.image;
          if (this.oldImageExists) this.deleteOldImage(this.oldImagePath);
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
          this.oldImageHidden = false;
          this.isSaving = false;
        }
      );
    } else {
      if (this.oldImageExists && this.oldImageHidden) {
        this.deleteOldImage(this.oldImagePath);
        this.articleToUpdate.image = '';
      }
      this.submitContent();
    }
  }

  deleteOldImage(oldImagePath: string) {
    this.articleService.deleteArticleImage(oldImagePath).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          console.log('¡La imagen se eliminó correctamente!');
        }
      },
      (error) => {
        if (error.error.message == '¡No se encontró la imagen!') {
          this.swalErrorMessage(error);
        } else console.log(error);
      }
    );
  }

  submitContent() {
    this.articleService.updateArticle(this.articleToUpdate._id, this.articleToUpdate).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          this.articleToUpdate = response.article;
          Swal.fire({
            icon: 'success',
            text: '¡El artículo se editó correctamente!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });
          this.router.navigate(['/blog/article', this.articleToUpdate._id]);
        }
        this.isSaving = false;
      },
      (error) => {
        if (error.error.message == '¡No se pudo conectar con la base de datos!') {
          this.swalErrorMessage(error);
        } else console.log(error);
        this.resetFile();
        this.oldImageHidden = false;
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

  hideOldImage() {
    this.oldImageHidden = true;
  }
}
