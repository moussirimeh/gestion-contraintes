import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { globals } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Achat0Service {
  private baseUrl = globals.apiBaseUrl + 'achat0';
  constructor(private http: HttpClient) { }

  getTop1IDToVerifAchat0(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/search/getTop1IDToVerifAchat0`);
}


}
