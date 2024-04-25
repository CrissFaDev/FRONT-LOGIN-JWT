import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }

  
  login(LoginRequest: LoginRequest):Observable<any>{
    const url = `${environment.urlAuth}/login`
    
    return this.http.post<any>(url , LoginRequest).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
      }),
      map((data) => {
        data.token = sessionStorage.getItem("token"); 
        return data.token; 
      }),
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    // Comprueba si el error tiene un status 0, lo que generalmente indica un error de conexión
    if (error.status === 0) {
      // Imprime un mensaje de error en la consola
      console.error('Se ha producido un error: ', error.error);
    } else {
      // Si el error tiene un código de estado diferente de 0, imprime un mensaje de error con el código de estado
      console.error('El backend retornó el código de estado: ', error);
    }
  
    // Retorna un observable que emite un nuevo error, para que los componentes que lo usan puedan manejarlo
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
