import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials' : 'true'
  })
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getAllStudies(): Observable<any> {
    const step = 100;
    return this.httpClient.get( environment.endpoint + '/reBurn/pending/studies', httpOptions);
  }
}
