import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private api = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]> { return this.http.get<Room[]>(this.api); }

  getById(id: number): Observable<Room> { return this.http.get<Room>(`${this.api}/${id}`); }

  create(room: Room): Observable<Room> { return this.http.post<Room>(this.api, room); }

  update(id: number, room: Room): Observable<Room> { return this.http.put<Room>(`${this.api}/${id}`, room); }

  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }

  getAvailable(checkIn?: string, checkOut?: string): Observable<Room[]> {
    let params = new HttpParams();
    if (checkIn) params = params.set('checkIn', checkIn);
    if (checkOut) params = params.set('checkOut', checkOut);
    return this.http.get<Room[]>(`${this.api}/available`, { params });
  }
}
