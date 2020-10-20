package com.example;

import com.example.model.Contact;
import com.example.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan({"com.example.repository"})
public class DemoApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void run(String... args) throws Exception {
        this.contactRepository.save(new Contact( "Aleksandra", "McGale", 647, "asdas", "ale@gmaill.com"));
        this.contactRepository.save(new Contact("Aleks", "McG", 647, "asdas", "ale@gmaill.com"));
        this.contactRepository.save(new Contact("Ethan", "Persaud", 647, "asdas", "ale@gmaill.com"));
        this.contactRepository.save(new Contact("Destiny", "Solutions", 647, "asdas", "ale@gmaill.com"));
        this.contactRepository.save(new Contact("Omni", "Update", 647, "asdas", "ale@gmaill.com"));



    }
}
