import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../../../core/services/room.service';
import { GuestService } from '../../../core/services/guest.service';
import { Room } from '../../../core/models/room.model';
import { Guest } from '../../../core/models/guest.model';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule
  ],
  templateUrl: './booking-dialog.component.html'
})
export class BookingDialogComponent implements OnInit {
  form: FormGroup;
  rooms: Room[] = [];
  guests: Guest[] = [];
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private roomService: RoomService,
    private guestService: GuestService
  ) {
    this.form = this.fb.group({
      guestId: ['', Validators.required],
      roomId: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.roomService.getAvailable().subscribe(r => this.rooms = r);
    this.guestService.getAll().subscribe(g => this.guests = g);
  }

  formatDate(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  submit(): void {
    if (this.form.valid) {
      const v = this.form.value;
      this.dialogRef.close({
        guest: { id: v.guestId },
        room: { id: v.roomId },
        checkInDate: this.formatDate(new Date(v.checkInDate)),
        checkOutDate: this.formatDate(new Date(v.checkOutDate)),
        notes: v.notes
      });
    }
  }
}
