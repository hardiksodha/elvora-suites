import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingService } from '../../core/services/booking.service';
import { Booking, BookingStatus } from '../../core/models/booking.model';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  statusFilter = '';
  displayedColumns = ['id', 'guest', 'room', 'checkInDate', 'checkOutDate', 'status', 'totalAmount', 'actions'];
  statuses = ['', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'];

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void { this.loadBookings(); }

  loadBookings(): void {
    this.bookingService.getAll(this.statusFilter || undefined).subscribe(b => this.bookings = b);
  }

  openDialog(): void {
    const ref = this.dialog.open(BookingDialogComponent, { width: '600px', data: null });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.create(result).subscribe(() => {
          this.loadBookings();
          this.snackBar.open('Booking created', 'Close', { duration: 3000 });
        });
      }
    });
  }

  checkIn(booking: Booking): void {
    this.bookingService.checkIn(booking.id!).subscribe(() => {
      this.loadBookings();
      this.snackBar.open('Guest checked in', 'Close', { duration: 3000 });
    });
  }

  checkOut(booking: Booking): void {
    this.bookingService.checkOut(booking.id!).subscribe(() => {
      this.loadBookings();
      this.snackBar.open('Guest checked out', 'Close', { duration: 3000 });
    });
  }

  cancel(booking: Booking): void {
    if (confirm('Cancel this booking?')) {
      this.bookingService.cancel(booking.id!).subscribe(() => {
        this.loadBookings();
        this.snackBar.open('Booking cancelled', 'Close', { duration: 3000 });
      });
    }
  }

  getGuestName(booking: Booking): string {
    const g = booking.guest as any;
    return g?.firstName ? `${g.firstName} ${g.lastName}` : `Guest #${g?.id}`;
  }

  getRoomNumber(booking: Booking): string {
    const r = booking.room as any;
    return r?.roomNumber || `Room #${r?.id}`;
  }
}
