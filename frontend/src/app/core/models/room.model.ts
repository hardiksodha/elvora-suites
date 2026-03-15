export type RoomType = 'SINGLE' | 'DOUBLE' | 'TWIN' | 'SUITE' | 'DELUXE' | 'PRESIDENTIAL';
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';

export interface Room {
  id?: number;
  roomNumber: string;
  roomType: RoomType;
  pricePerNight: number;
  floor?: number;
  capacity?: number;
  description?: string;
  status: RoomStatus;
}
