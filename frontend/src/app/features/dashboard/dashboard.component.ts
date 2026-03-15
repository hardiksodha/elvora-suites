import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DashboardService, DashboardStats } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;

  statCards = [
    { key: 'totalRooms', label: 'Total Rooms', icon: 'hotel', color: '#3f51b5', route: '/rooms' },
    { key: 'availableRooms', label: 'Available Rooms', icon: 'check_circle', color: '#4caf50', route: '/rooms' },
    { key: 'occupiedRooms', label: 'Occupied Rooms', icon: 'do_not_disturb', color: '#f44336', route: '/rooms' },
    { key: 'totalGuests', label: 'Total Guests', icon: 'people', color: '#9c27b0', route: '/guests' },
    { key: 'confirmedBookings', label: 'Confirmed Bookings', icon: 'event_available', color: '#2196f3', route: '/bookings' },
    { key: 'checkedInBookings', label: 'Guests Checked In', icon: 'login', color: '#ff9800', route: '/bookings' },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(s => this.stats = s);
  }

  getValue(key: string): number {
    return this.stats ? (this.stats as any)[key] : 0;
  }
}
