import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
  providers: [ArticleService],
})
export class ArticleCreateComponent implements OnInit {
  public articleToCreate: Article;
  public requestStatus: string = '';

  public afuConfig: any;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.articleToCreate = new Article('', '', '', '', null);
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg,.png,.gif,.jpeg',
      maxSize: '1',
      uploadAPI: {
        url: Global.url + 'article_img_upload',
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

  ngOnInit(): void {}

  submitArticle() {
    this.articleService.createArticle(this.articleToCreate).subscribe(
      (response) => {
        if (response.status == 'Ok') {
          this.requestStatus = 'success';
          this.articleToCreate = response.article;

          Swal.fire({
            icon: 'success',
            text: '¡El artículo se creó correctamente!',
            confirmButtonColor: '#179613',
            confirmButtonText: 'Aceptar',
          });

          this.router.navigate(['/blog']);
        } else {
          this.requestStatus = 'error';
        }
      },
      (error) => {
        console.log('Super error' + error);
        Swal.fire({
          icon: 'error',
          text: '¡El artículo no se pudo crear!',
          confirmButtonColor: '#179613',
          confirmButtonText: 'Aceptar',
        });
        this.requestStatus = 'error';
      }
    );
  }

  imageUpload(event: any) {
    this.articleToCreate.image = event.body.image;
  }
}
