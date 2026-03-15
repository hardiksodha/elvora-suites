import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.model';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatChipsModule, MatSnackBarModule
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  displayedColumns = ['roomNumber', 'roomType', 'floor', 'capacity', 'pricePerNight', 'status', 'actions'];

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void { this.loadRooms(); }

  loadRooms(): void {
    this.roomService.getAll().subscribe(rooms => this.rooms = rooms);
  }

  openDialog(room?: Room): void {
    const ref = this.dialog.open(RoomDialogComponent, {
      width: '500px',
      data: room ? { ...room } : null
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        const op = result.id
          ? this.roomService.update(result.id, result)
          : this.roomService.create(result);
        op.subscribe(() => {
          this.loadRooms();
          this.snackBar.open(result.id ? 'Room updated' : 'Room created', 'Close', { duration: 3000 });
        });
      }
    });
  }

  delete(room: Room): void {
    if (confirm(`Delete room ${room.roomNumber}?`)) {
      this.roomService.delete(room.id!).subscribe(() => {
        this.loadRooms();
        this.snackBar.open('Room deleted', 'Close', { duration: 3000 });
      });
    }
  }
}
