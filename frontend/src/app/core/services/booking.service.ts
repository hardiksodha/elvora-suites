import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  getAll(status?: string): Observable<Booking[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Booking[]>(this.api, { params });
  }

  getById(id: number): Observable<Booking> { return this.http.get<Booking>(`${this.api}/${id}`); }

  create(booking: Partial<Booking>): Observable<Booking> { return this.http.post<Booking>(this.api, booking); }

  update(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.api}/${id}`, booking);
  }

  checkIn(id: number): Observable<Booking> { return this.http.post<Booking>(`${this.api}/${id}/check-in`, {}); }

  checkOut(id: number): Observable<Booking> { return this.http.post<Booking>(`${this.api}/${id}/check-out`, {}); }

  cancel(id: number): Observable<Booking> { return this.http.post<Booking>(`${this.api}/${id}/cancel`, {}); }
}
