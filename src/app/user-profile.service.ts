import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  private apiUrl = 'https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2'

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
