import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router) { }

  // Verifica si hay un token en sessionStorage
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  // Método para cerrar sesión
  logout() {
    // Elimina el token del sessionStorage u realiza cualquier otra acción de cierre de sesión
    sessionStorage.removeItem('token');
     this.router.navigate(['/iniciar-sesion']);
  }
}
