import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest.model';

@Injectable({ providedIn: 'root' })
export class GuestService {
  private api = 'http://localhost:8080/api/guests';

  constructor(private http: HttpClient) {}

  getAll(search?: string): Observable<Guest[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Guest[]>(this.api, { params });
  }

  getById(id: number): Observable<Guest> { return this.http.get<Guest>(`${this.api}/${id}`); }

  create(guest: Guest): Observable<Guest> { return this.http.post<Guest>(this.api, guest); }

  update(id: number, guest: Guest): Observable<Guest> { return this.http.put<Guest>(`${this.api}/${id}`, guest); }

  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
}
