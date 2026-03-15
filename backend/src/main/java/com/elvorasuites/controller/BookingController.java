package com.elvorasuites.controller;

import com.elvorasuites.entity.Booking;
import com.elvorasuites.enums.BookingStatus;
import com.elvorasuites.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<Booking> getAll(@RequestParam(required = false) String status) {
        if (status != null) return bookingService.getByStatus(BookingStatus.valueOf(status.toUpperCase()));
        return bookingService.getAll();
    }

    @GetMapping("/{id}")
    public Booking getById(@PathVariable Long id) { return bookingService.getById(id); }

    @GetMapping("/guest/{guestId}")
    public List<Booking> getByGuest(@PathVariable Long guestId) { return bookingService.getByGuest(guestId); }

    @PostMapping
    public Booking create(@Valid @RequestBody Booking booking) { return bookingService.create(booking); }

    @PutMapping("/{id}")
    public Booking update(@PathVariable Long id, @Valid @RequestBody Booking booking) {
        return bookingService.update(id, booking);
    }

    @PostMapping("/{id}/check-in")
    public Booking checkIn(@PathVariable Long id) { return bookingService.checkIn(id); }

    @PostMapping("/{id}/check-out")
    public Booking checkOut(@PathVariable Long id) { return bookingService.checkOut(id); }

    @PostMapping("/{id}/cancel")
    public Booking cancel(@PathVariable Long id) { return bookingService.cancel(id); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookingService.cancel(id);
        return ResponseEntity.noContent().build();
    }
}
