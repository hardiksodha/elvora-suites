import { Guest } from './guest.model';
import { Room } from './room.model';

export type BookingStatus = 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

export interface Booking {
  id?: number;
  guest: Guest | { id: number };
  room: Room | { id: number };
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  totalAmount?: number;
  notes?: string;
  createdAt?: string;
}
