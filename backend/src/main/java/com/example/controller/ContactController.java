package com.example.controller;

import java.util.List;
import java.util.Optional;

import com.example.model.Contact;
import com.example.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping
    public List <Contact> getUsers() {
        return this.contactRepository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Contact> findById(@PathVariable Long id) {
        Optional<Contact> contact = this.contactRepository.findById(id);
        if (!contact.isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(contact.get());
    }
    @PostMapping
    public ResponseEntity create(@Valid @RequestBody Contact contact) {
        return ResponseEntity.ok(this.contactRepository.save(contact));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(@PathVariable Long id, @Valid @RequestBody Contact contact) {
        if (!contactRepository.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(this.contactRepository.save(contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        if (!this.contactRepository.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }

        this.contactRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}