import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Guest } from '../../../core/models/guest.model';

@Component({
  selector: 'app-guest-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './guest-dialog.component.html'
})
export class GuestDialogComponent {
  form: FormGroup;
  isEdit: boolean;
  idTypes = ['PASSPORT', 'DRIVING_LICENSE', 'NATIONAL_ID', 'OTHER'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GuestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Guest | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || ''],
      address: [data?.address || ''],
      idType: [data?.idType || ''],
      idNumber: [data?.idNumber || '']
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }
}
