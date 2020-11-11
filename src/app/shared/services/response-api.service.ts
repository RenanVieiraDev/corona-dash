import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseAPIService {
  public apiURL = 'https://covid19-brazil-api.now.sh/api/report/';

  constructor(private httpClient: HttpClient) { }
  
  public getListaCasosPorTodosEstadosBrasileiros():Observable<any>{
    return this.httpClient.get(`${this.apiURL}v1`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  } 

  public getInforDoEstado(data):Observable<any>{
    return this.httpClient.get(`${this.apiURL}v1/brazil/uf/${data}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  } 

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
  
}
