import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
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
  public requestStatus: string = '';
  public baseURL: string = Global.url;

  public afuConfig: any;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.articleToUpdate = new Article('', '', '', '', null);
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg,.png,.gif,.jpeg',
      maxSize: '1',
      uploadAPI: {
        url: this.baseURL + 'article_img_upload',
        method: 'POST',
      },
      theme: 'attachPin',
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: true,
      fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Selecciona el archivo...',
        resetBtn: 'Borrar',
        uploadBtn: 'Cargar',
        dragNDropBox: 'Arrastra y suelta el archivo aquí',
        attachPinBtn: 'Selecciona la imagen...',
        afterUploadMsg_success: '¡El archivo se cargó exitosamente!',
        afterUploadMsg_error: '¡No se pudo cargar el archivo!',
        sizeLimit: 'Tamaño Límite',
      },
    };
  }

  ngOnInit(): void {
    this.getArticle();
  }

  submitArticle() {
    this.articleService.updateArticle(this.articleToUpdate._id, this.articleToUpdate).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          this.requestStatus = 'success';
          this.articleToUpdate = response.article;

          Swal.fire({
            icon: 'success',
            text: '¡El artículo se editó correctamente!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });

          this.router.navigate(['/blog/article', this.articleToUpdate._id]);
        } else {
          this.requestStatus = 'error';
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          text: '¡El artículo no se pudo editar!',
          confirmButtonColor: '#179613',
          confirmButtonText: 'Aceptar',
        });
        console.log('Waka error' + error);
        this.requestStatus = 'error';
      }
    );
  }

  imageUpload(event: any) {
    this.articleToUpdate.image = event.body.image;
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
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/home']);
        }
      );
    });
  }
}
