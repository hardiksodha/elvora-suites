import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../../core/models/room.model';

@Component({
  selector: 'app-room-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './room-dialog.component.html'
})
export class RoomDialogComponent {
  form: FormGroup;
  isEdit: boolean;

  roomTypes = ['SINGLE', 'DOUBLE', 'TWIN', 'SUITE', 'DELUXE', 'PRESIDENTIAL'];
  roomStatuses = ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      roomNumber: [data?.roomNumber || '', Validators.required],
      roomType: [data?.roomType || 'SINGLE', Validators.required],
      pricePerNight: [data?.pricePerNight || '', [Validators.required, Validators.min(1)]],
      floor: [data?.floor || ''],
      capacity: [data?.capacity || ''],
      description: [data?.description || ''],
      status: [data?.status || 'AVAILABLE']
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }
}
