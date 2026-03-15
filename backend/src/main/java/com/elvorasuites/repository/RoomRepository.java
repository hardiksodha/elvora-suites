package com.elvorasuites.repository;

import com.elvorasuites.entity.Room;
import com.elvorasuites.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(RoomStatus status);

    @Query("""
        SELECT r FROM Room r WHERE r.status = 'AVAILABLE'
        AND r.id NOT IN (
            SELECT b.room.id FROM Booking b
            WHERE b.status IN ('CONFIRMED', 'CHECKED_IN')
            AND NOT (b.checkOutDate <= :checkIn OR b.checkInDate >= :checkOut)
        )
    """)
    List<Room> findAvailableRooms(@Param("checkIn") LocalDate checkIn, @Param("checkOut") LocalDate checkOut);
}
