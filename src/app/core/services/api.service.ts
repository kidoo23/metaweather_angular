import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(
    path: string,
    params: HttpParams | { [param: string]: string } = new HttpParams()
  ): Observable<any> {
    return this.http.get(`${environment.base_url}${path}`, { params });
  }
}
