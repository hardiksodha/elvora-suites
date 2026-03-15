package com.elvorasuites.controller;

import com.elvorasuites.entity.Room;
import com.elvorasuites.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<Room> getAll() { return roomService.getAll(); }

    @GetMapping("/{id}")
    public Room getById(@PathVariable Long id) { return roomService.getById(id); }

    @PostMapping
    public Room create(@Valid @RequestBody Room room) { return roomService.save(room); }

    @PutMapping("/{id}")
    public Room update(@PathVariable Long id, @Valid @RequestBody Room room) {
        return roomService.update(id, room);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/available")
    public List<Room> getAvailable(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        if (checkIn != null && checkOut != null) {
            return roomService.getAvailableForDates(checkIn, checkOut);
        }
        return roomService.getAvailable();
    }
}
