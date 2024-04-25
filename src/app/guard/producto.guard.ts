import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = sessionStorage.getItem('token');
    if (token) {
      return true; // Usuario autenticado, permite el acceso
    } else {
      // No hay token, redirige al login y luego vuelve a la página de producto
      this.router.navigate(['/iniciar-sesion'], );
      return false;
    }
  }
}
