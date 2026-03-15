package com.elvorasuites.controller;

import com.elvorasuites.entity.Guest;
import com.elvorasuites.service.GuestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {
    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping
    public List<Guest> getAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) return guestService.search(search);
        return guestService.getAll();
    }

    @GetMapping("/{id}")
    public Guest getById(@PathVariable Long id) { return guestService.getById(id); }

    @PostMapping
    public Guest create(@Valid @RequestBody Guest guest) { return guestService.save(guest); }

    @PutMapping("/{id}")
    public Guest update(@PathVariable Long id, @Valid @RequestBody Guest guest) {
        return guestService.update(id, guest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        guestService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
