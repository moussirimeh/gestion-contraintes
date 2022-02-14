import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globals } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AchatService {
  private baseUrl = globals.apiBaseUrl + 'achat';
  constructor(private http: HttpClient) { }

  verifAchatWidhTotDeviseAndTotDTAndOp() {
    return this.http.get(`${this.baseUrl}/search/getAchatWidhTotDeviseAndTotDTAndOp`);
  }
}
