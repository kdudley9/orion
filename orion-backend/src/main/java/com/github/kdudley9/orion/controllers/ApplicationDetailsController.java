package com.github.kdudley9.orion.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kdudley9.orion.dtos.ApplicationDetailsDto;
import com.github.kdudley9.orion.mappers.ApplicationDetailsMapper;
import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.User;
import com.github.kdudley9.orion.repositories.ApplicationDetailsRepository;
import com.github.kdudley9.orion.repositories.UserRepository;
import com.github.kdudley9.orion.security.UserFacade;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/application-details")
public class ApplicationDetailsController {

    private final ApplicationDetailsRepository appDetailsRepository;
    private final ApplicationDetailsMapper appDetailsMapper;
    private final UserRepository userRepository;
    private final UserFacade userFacade;

    public ApplicationDetailsController(ApplicationDetailsRepository appDetailsRepository, ApplicationDetailsMapper appDetailsMapper, UserRepository userRepository, UserFacade userFacade) {
        this.appDetailsRepository = appDetailsRepository;
        this.appDetailsMapper = appDetailsMapper;
        this.userFacade = userFacade;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDetailsDto>> getAllApplications() {
        String userId = userFacade.getCurrentUserId();
        List<ApplicationDetailsDto> allAppDetails = this.appDetailsRepository
            .findByUserId(userId).stream().map(this.appDetailsMapper::toDto).toList();
        return new ResponseEntity<>(allAppDetails, HttpStatus.OK);  
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDetailsDto> getApplicationById(@PathVariable Long id) {
        ApplicationDetails appDetails = this.appDetailsRepository.findById(id).orElse(null);
        if (id == null) {
            return ResponseEntity.notFound().build();
        }

        return new ResponseEntity<>(this.appDetailsMapper.toDto(appDetails), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApplicationDetailsDto> addApplication(@RequestBody ApplicationDetailsDto applicationDetailsDto) {
        String userId = userFacade.getCurrentUserId();
        ApplicationDetails applicationDetails = this.appDetailsMapper.toEntity(applicationDetailsDto);
        
        User user = this.userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        applicationDetails.setUser(user);

        this.appDetailsRepository.save(applicationDetails);
        return new ResponseEntity<>(this.appDetailsMapper.toDto(applicationDetails), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDetailsDto> updateApplication(@PathVariable Long id, @RequestBody ApplicationDetailsDto applicationDetailsDto) {
        ApplicationDetails applicationToUpdate = this.appDetailsRepository.findById(id).orElse(null);
        if (id == null) {
            return ResponseEntity.notFound().build();
        }

        applicationToUpdate.setCompany(applicationDetailsDto.company());
        applicationToUpdate.setIndustry(applicationDetailsDto.industry());
        applicationToUpdate.setJobTitle(applicationDetailsDto.jobTitle());
        applicationToUpdate.setLocation(applicationDetailsDto.location());
        applicationToUpdate.setNote(applicationDetailsDto.note());
        applicationToUpdate.setStatus(applicationDetailsDto.status());
        applicationToUpdate.setUrl(applicationDetailsDto.url());
        applicationToUpdate.setDateApplied(applicationDetailsDto.dateApplied());
        ApplicationDetails updatedApplicationDetails = this.appDetailsRepository.save(applicationToUpdate);

        return new ResponseEntity<>(this.appDetailsMapper.toDto(updatedApplicationDetails), HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteAllApplications() {
        this.appDetailsRepository.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteApplicationById(@PathVariable Long id) {
        this.appDetailsRepository.deleteById(id);
    }
}
