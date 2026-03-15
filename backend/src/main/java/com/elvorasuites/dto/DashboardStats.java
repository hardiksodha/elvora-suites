package com.elvorasuites.dto;

public class DashboardStats {
    private final long totalRooms;
    private final long availableRooms;
    private final long occupiedRooms;
    private final long totalGuests;
    private final long activeBookings;
    private final long confirmedBookings;
    private final long checkedInBookings;

    public DashboardStats(long totalRooms, long availableRooms, long occupiedRooms,
                          long totalGuests, long activeBookings, long confirmedBookings, long checkedInBookings) {
        this.totalRooms = totalRooms;
        this.availableRooms = availableRooms;
        this.occupiedRooms = occupiedRooms;
        this.totalGuests = totalGuests;
        this.activeBookings = activeBookings;
        this.confirmedBookings = confirmedBookings;
        this.checkedInBookings = checkedInBookings;
    }

    public long getTotalRooms() { return totalRooms; }
    public long getAvailableRooms() { return availableRooms; }
    public long getOccupiedRooms() { return occupiedRooms; }
    public long getTotalGuests() { return totalGuests; }
    public long getActiveBookings() { return activeBookings; }
    public long getConfirmedBookings() { return confirmedBookings; }
    public long getCheckedInBookings() { return checkedInBookings; }
}
