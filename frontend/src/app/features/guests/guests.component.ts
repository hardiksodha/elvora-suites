import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GuestService } from '../../core/services/guest.service';
import { Guest } from '../../core/models/guest.model';
import { GuestDialogComponent } from './guest-dialog/guest-dialog.component';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule
  ],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss'
})
export class GuestsComponent implements OnInit {
  guests: Guest[] = [];
  searchQuery = '';
  displayedColumns = ['name', 'email', 'phone', 'idType', 'idNumber', 'actions'];

  constructor(
    private guestService: GuestService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void { this.loadGuests(); }

  loadGuests(): void {
    this.guestService.getAll(this.searchQuery || undefined).subscribe(g => this.guests = g);
  }

  openDialog(guest?: Guest): void {
    const ref = this.dialog.open(GuestDialogComponent, {
      width: '500px',
      data: guest ? { ...guest } : null
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        const op = result.id
          ? this.guestService.update(result.id, result)
          : this.guestService.create(result);
        op.subscribe(() => {
          this.loadGuests();
          this.snackBar.open(result.id ? 'Guest updated' : 'Guest added', 'Close', { duration: 3000 });
        });
      }
    });
  }

  delete(guest: Guest): void {
    if (confirm(`Remove guest ${guest.firstName} ${guest.lastName}?`)) {
      this.guestService.delete(guest.id!).subscribe(() => {
        this.loadGuests();
        this.snackBar.open('Guest removed', 'Close', { duration: 3000 });
      });
    }
  }
}
