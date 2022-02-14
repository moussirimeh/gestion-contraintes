import { Injectable, NgZone } from '@angular/core';

import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { dataBound } from '@syncfusion/ej2-grids';
import { waitForMap } from '@angular/router/src/utils/collection';
import { globals } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = globals.apiBaseUrl + 'clients';

  constructor(private http: HttpClient, private ngZone: NgZone) {}
  // tslint:disable-next-line:max-line-length
 
  getNumberOfCltNotInZone(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search/clientsReservList`);
  }


}
