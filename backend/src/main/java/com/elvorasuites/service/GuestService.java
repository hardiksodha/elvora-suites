package com.elvorasuites.service;

import com.elvorasuites.entity.Guest;
import com.elvorasuites.repository.GuestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {
    private final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<Guest> getAll() { return guestRepository.findAll(); }

    public Guest getById(Long id) {
        return guestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Guest not found: " + id));
    }

    public Guest save(Guest guest) { return guestRepository.save(guest); }

    public Guest update(Long id, Guest updated) {
        Guest existing = getById(id);
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setAddress(updated.getAddress());
        existing.setIdType(updated.getIdType());
        existing.setIdNumber(updated.getIdNumber());
        return guestRepository.save(existing);
    }

    public void delete(Long id) { guestRepository.deleteById(id); }

    public List<Guest> search(String query) {
        return guestRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            query, query, query);
    }
}
