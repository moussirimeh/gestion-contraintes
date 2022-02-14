import { Injectable, NgZone } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { globals } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrouService {
  private baseUrl = globals.apiBaseUrl + 'brous';
  // private baseUrlAutomotive = localStorage.getItem('apiUrl') + 'automotive/rest/brous';
  // private baseUrlHardware = localStorage.getItem('apiUrl') + 'hardware/rest/brous';

  constructor(private http: HttpClient, private ngZone: NgZone) {}



  getTop1IDToVerifBrou(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/search/getTop1IDToVerifBrou`);
}


}
