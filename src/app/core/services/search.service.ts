import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TokenResponse } from '@core/interfaces/token-response.interface';
import { TicketsResponse } from '@core/interfaces/tickets-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private url = environment.serverUrl;

  constructor(private httpClient: HttpClient) {}

  getToken(): Observable<TokenResponse> {
    return this.httpClient.get<TokenResponse>(`${this.url}/search`);
  }

  getFlights(): Observable<TicketsResponse> {
    return this.httpClient.get<TicketsResponse>(`${this.url}/tickets`);
  }
}
