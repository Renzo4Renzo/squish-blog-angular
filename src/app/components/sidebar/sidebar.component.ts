import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public searchString: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  validateSearchString() {
    let searchStringModified = this.searchString.trim();
    console.log('searchStringModified: ' + searchStringModified);
    this.searchArticle(searchStringModified);
  }

  searchArticle(searchStringModified: string) {
    if (searchStringModified.length > 1) {
      this.router.navigate(['/search', searchStringModified]);
    } else {
      Swal.fire({
        icon: 'error',
        text: '¡La búsqueda debe contener al menos 2 caracteres alfanuméricos!',
        confirmButtonColor: '#179613',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
