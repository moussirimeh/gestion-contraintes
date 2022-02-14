import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { globals } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SfamilleService {
  private baseUrl = globals.apiBaseUrl + 'sfamilles';
  constructor(private http: HttpClient) {}


 
  getNumberOfSfmNotInFamille(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/findNumberOfSfmNotInFamille`);
  }
}
