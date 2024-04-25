import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  getProductos() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  listProducts(): Observable<Producto[]> {
    const url = `${environment.urlApi}producto`;
    return this.http.get<Producto[]>(url).pipe(catchError(this.handleError));
  }

  deleteProducts(id: number):Observable<Producto> {
    const url = `${environment.urlApi}producto/${id}`;

    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete<Producto>(url, {headers}).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
