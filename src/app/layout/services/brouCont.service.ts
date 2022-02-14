import { Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



import { globals } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrouContService {
  private baseUrl = globals.apiBaseUrl + 'brouCont';

  constructor(private http: HttpClient) {}


  getTop1IDToVerifBrouCont(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search/getTop1IDToVerifBrouCont`);
  }
  

}
