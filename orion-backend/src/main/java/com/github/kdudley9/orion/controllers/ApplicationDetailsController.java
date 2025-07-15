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
import com.github.kdudley9.orion.dtos.DashboardDto;
import com.github.kdudley9.orion.security.UserFacade;
import com.github.kdudley9.orion.services.ApplicationDetailsService;
import com.github.kdudley9.orion.services.DashboardService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/application-details")
public class ApplicationDetailsController {

    private final ApplicationDetailsService applicationDetailsService;
    private final UserFacade userFacade;
    private final DashboardService dashboardService;

    public ApplicationDetailsController(ApplicationDetailsService applicationDetailsService, UserFacade userFacade, DashboardService dashboardService) {
        this.applicationDetailsService = applicationDetailsService;
        this.userFacade = userFacade;
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDetailsDto>> getAllApplications() {
        String userId = userFacade.getCurrentUserId();
        List<ApplicationDetailsDto> allAppDetails = applicationDetailsService.getAllApplications(userId);
        return new ResponseEntity<>(allAppDetails, HttpStatus.OK);  
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDetailsDto> getApplicationById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            ApplicationDetailsDto appDetails = applicationDetailsService.getApplication(id);
            return new ResponseEntity<>(appDetails, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping
    public ResponseEntity<ApplicationDetailsDto> addApplication(@RequestBody ApplicationDetailsDto applicationDetailsDto) {
        String userId = userFacade.getCurrentUserId();
        ApplicationDetailsDto addedApplicationDetails = applicationDetailsService.addApplication(userId, applicationDetailsDto);
        return new ResponseEntity<>(addedApplicationDetails, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDetailsDto> updateApplication(@PathVariable Long id, @RequestBody ApplicationDetailsDto applicationDetailsDto) {
        if (id == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            ApplicationDetailsDto applicationToUpdate = applicationDetailsService.updateApplication(id, applicationDetailsDto);
            return new ResponseEntity<>(applicationToUpdate, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllApplications() {
        int numberDeleted = applicationDetailsService.deleteAllApplications(userFacade.getCurrentUserId());
        if (numberDeleted == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplicationById(@PathVariable Long id) {
        int numberDeleted = applicationDetailsService.deleteApplicationById(id, userFacade.getCurrentUserId());
        if (numberDeleted == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboardData() {
        DashboardDto dashboardData = this.dashboardService.getDashboardData(userFacade.getCurrentUserId());
        return new ResponseEntity<>(dashboardData, HttpStatus.OK);
    }
}
