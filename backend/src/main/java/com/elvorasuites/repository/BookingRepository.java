package com.elvorasuites.repository;

import com.elvorasuites.entity.Booking;
import com.elvorasuites.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByGuestId(Long guestId);
    long countByStatus(BookingStatus status);
}
