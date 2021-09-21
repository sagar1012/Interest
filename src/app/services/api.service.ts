import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiurl;

@Injectable()

export class ApiService {

  constructor(private http: HttpClient,
    private router: Router) { }


  get(url: string, headers?: HttpHeaders, params?: HttpParams, active?: boolean): Observable<any> {
    return this.http.get(API_URL + url, { headers: headers, params }).pipe(map((resp: any) => { return resp; }));
  }

  post(url: string, body?: object, headers?: HttpHeaders, active?: boolean): Observable<any> {
    return this.http.post(API_URL + url, body, { headers: headers }).pipe(map((resp: any) => { return resp; }));
  }

  delete(url: string, body?: object, headers?: HttpHeaders, active?: boolean): Observable<any> {
    return this.http.post(API_URL + url, body, { headers: headers }).pipe(map((resp: any) => { return resp; }));
  }

  put(url: string, body?: object, headers?: HttpHeaders, active?: boolean): Observable<any> {
    return this.http.put(API_URL + url, body, { headers: headers }).pipe(map((resp: any) => { return resp; }));
  }

}
