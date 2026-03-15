package com.elvorasuites.service;

import com.elvorasuites.entity.Booking;
import com.elvorasuites.enums.BookingStatus;
import com.elvorasuites.enums.RoomStatus;
import com.elvorasuites.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RoomService roomService;

    public BookingService(BookingRepository bookingRepository, RoomService roomService) {
        this.bookingRepository = bookingRepository;
        this.roomService = roomService;
    }

    public List<Booking> getAll() { return bookingRepository.findAll(); }

    public Booking getById(Long id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
    }

    public Booking create(Booking booking) {
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public Booking update(Long id, Booking updated) {
        Booking existing = getById(id);
        existing.setCheckInDate(updated.getCheckInDate());
        existing.setCheckOutDate(updated.getCheckOutDate());
        existing.setNotes(updated.getNotes());
        return bookingRepository.save(existing);
    }

    public Booking checkIn(Long id) {
        Booking booking = getById(id);
        booking.setStatus(BookingStatus.CHECKED_IN);
        booking.getRoom().setStatus(RoomStatus.OCCUPIED);
        roomService.save(booking.getRoom());
        return bookingRepository.save(booking);
    }

    public Booking checkOut(Long id) {
        Booking booking = getById(id);
        booking.setStatus(BookingStatus.CHECKED_OUT);
        booking.getRoom().setStatus(RoomStatus.AVAILABLE);
        roomService.save(booking.getRoom());
        return bookingRepository.save(booking);
    }

    public Booking cancel(Long id) {
        Booking booking = getById(id);
        booking.setStatus(BookingStatus.CANCELLED);
        RoomStatus rs = booking.getRoom().getStatus();
        if (rs == RoomStatus.OCCUPIED || rs == RoomStatus.RESERVED) {
            booking.getRoom().setStatus(RoomStatus.AVAILABLE);
            roomService.save(booking.getRoom());
        }
        return bookingRepository.save(booking);
    }

    public List<Booking> getByStatus(BookingStatus status) { return bookingRepository.findByStatus(status); }

    public List<Booking> getByGuest(Long guestId) { return bookingRepository.findByGuestId(guestId); }

    public long countByStatus(BookingStatus status) { return bookingRepository.countByStatus(status); }
}
