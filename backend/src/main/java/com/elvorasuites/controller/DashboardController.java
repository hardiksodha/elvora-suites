package com.elvorasuites.controller;

import com.elvorasuites.dto.DashboardStats;
import com.elvorasuites.enums.BookingStatus;
import com.elvorasuites.enums.RoomStatus;
import com.elvorasuites.repository.GuestRepository;
import com.elvorasuites.repository.RoomRepository;
import com.elvorasuites.service.BookingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final RoomRepository roomRepository;
    private final GuestRepository guestRepository;
    private final BookingService bookingService;

    public DashboardController(RoomRepository roomRepository, GuestRepository guestRepository, BookingService bookingService) {
        this.roomRepository = roomRepository;
        this.guestRepository = guestRepository;
        this.bookingService = bookingService;
    }

    @GetMapping("/stats")
    public DashboardStats getStats() {
        return new DashboardStats(
            roomRepository.count(),
            roomRepository.findByStatus(RoomStatus.AVAILABLE).size(),
            roomRepository.findByStatus(RoomStatus.OCCUPIED).size(),
            guestRepository.count(),
            bookingService.countByStatus(BookingStatus.CONFIRMED) + bookingService.countByStatus(BookingStatus.CHECKED_IN),
            bookingService.countByStatus(BookingStatus.CONFIRMED),
            bookingService.countByStatus(BookingStatus.CHECKED_IN)
        );
    }
}
