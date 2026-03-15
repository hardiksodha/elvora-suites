package com.elvorasuites.service;

import com.elvorasuites.entity.Room;
import com.elvorasuites.enums.RoomStatus;
import com.elvorasuites.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAll() { return roomRepository.findAll(); }

    public Room getById(Long id) {
        return roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found: " + id));
    }

    public Room save(Room room) { return roomRepository.save(room); }

    public Room update(Long id, Room updated) {
        Room existing = getById(id);
        existing.setRoomNumber(updated.getRoomNumber());
        existing.setRoomType(updated.getRoomType());
        existing.setPricePerNight(updated.getPricePerNight());
        existing.setFloor(updated.getFloor());
        existing.setCapacity(updated.getCapacity());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        return roomRepository.save(existing);
    }

    public void delete(Long id) { roomRepository.deleteById(id); }

    public List<Room> getAvailable() { return roomRepository.findByStatus(RoomStatus.AVAILABLE); }

    public List<Room> getAvailableForDates(LocalDate checkIn, LocalDate checkOut) {
        return roomRepository.findAvailableRooms(checkIn, checkOut);
    }
}
