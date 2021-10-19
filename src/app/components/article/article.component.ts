import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/Article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  public article: Article = new Article('', 'Cargando', '', '', '');

  public baseURL: string;
  public errorMessage: string = '';

  public isLoading: boolean = true;
  public isDeleting: boolean = false;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.baseURL = Global.url;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.articleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            this.article = response.article;
            this.isLoading = false;
          }
        },
        (error) => {
          if (error.error.message == '¡No se pudo conectar con la base de datos!') {
            this.swalErrorMessage(error);
          } else console.log(error);
          this.isLoading = false;
          this.router.navigate(['/home']);
        }
      );
    });
  }

  deleteArticle(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si eliminas el artículo, ¡no podrás recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#179613',
      cancelButtonColor: '#eb1616',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeleting = true;
        this.articleService.deleteArticle(id).subscribe(
          (response) => {
            //console.log('¡Artículo con ' + id + ' borrado exitosamente!');
            Swal.fire({
              icon: 'success',
              text: '¡El artículo se eliminó correctamente!',
              confirmButtonColor: '#179613',
              confirmButtonText: 'Aceptar',
            });
            this.isDeleting = false;
            this.router.navigate(['/blog']);
          },
          (error) => {
            if (error.error.message == '¡No se pudo conectar con la base de datos!') {
              this.swalErrorMessage(error);
            } else console.log(error);
            this.isDeleting = false;
            this.router.navigate(['/blog/article', id]);
          }
        );
      }
    });
  }

  swalErrorMessage(error: any) {
    Swal.fire({
      icon: 'error',
      text: error.error.message,
      confirmButtonColor: '#179613',
      confirmButtonText: 'Aceptar',
    });
  }
}
