package com.github.kdudley9.orion.services;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.kdudley9.orion.dtos.ApplicationDetailsDto;
import com.github.kdudley9.orion.mappers.ApplicationDetailsMapper;
import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.User;
import com.github.kdudley9.orion.repositories.ApplicationDetailsRepository;
import com.github.kdudley9.orion.repositories.UserRepository;
import com.github.kdudley9.orion.security.UserFacade;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ApplicationDetailsService {

    private final ApplicationDetailsRepository applicationDetailsRepository;
    private final ApplicationDetailsMapper appDetailsMapper;
    private final UserRepository userRepository;
    private final UserFacade userFacade;
    private ObjectMapper objectMapper;

    public ApplicationDetailsService(ApplicationDetailsRepository applicationDetailsRepository, ApplicationDetailsMapper appDetailsMapper,
            UserRepository userRepository, UserFacade userFacade, ObjectMapper objectMapper) {
        this.applicationDetailsRepository = applicationDetailsRepository;
        this.appDetailsMapper = appDetailsMapper;
        this.userRepository = userRepository;
        this.userFacade = userFacade;
        this.objectMapper = objectMapper;
    }

    public List<ApplicationDetailsDto> getAllApplications(String userId) {
        List<ApplicationDetailsDto> allAppDetails = this.applicationDetailsRepository
            .findByUserId(userId).stream().map(this.appDetailsMapper::toDto).toList();
        return allAppDetails;
    }

    public ApplicationDetailsDto getApplication(Long id) {
        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(id).orElse(null);

        if (!applicationDetails.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found.");
        }

        return this.appDetailsMapper.toDto(applicationDetails);
    }

    public ApplicationDetailsDto addApplication(String userId, ApplicationDetailsDto applicationDetailsDto) {
        ApplicationDetails applicationDetails = this.appDetailsMapper.toEntity(applicationDetailsDto);

        User user = this.userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found."));

        applicationDetails.setUser(user);

        this.applicationDetailsRepository.save(applicationDetails);
        return this.appDetailsMapper.toDto(applicationDetails);
    }

    public ApplicationDetailsDto updateApplication(Long id, ApplicationDetailsDto applicationDetailsDto) {
        ApplicationDetails applicationToUpdate = this.applicationDetailsRepository.findById(id).orElse(null);

        if (!applicationToUpdate.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found.");
        }

        applicationToUpdate.setCompany(applicationDetailsDto.company());
        applicationToUpdate.setIndustry(applicationDetailsDto.industry());
        applicationToUpdate.setJobTitle(applicationDetailsDto.jobTitle());
        applicationToUpdate.setLocation(applicationDetailsDto.location());
        applicationToUpdate.setJobDescription(applicationDetailsDto.jobDescription());
        applicationToUpdate.setJobType(applicationDetailsDto.jobType());
        applicationToUpdate.setUrl(applicationDetailsDto.url());
        applicationToUpdate.setDateApplied(applicationDetailsDto.dateApplied());
        ApplicationDetails updatedApplicationDetails = this.applicationDetailsRepository.save(applicationToUpdate);

        return this.appDetailsMapper.toDto(updatedApplicationDetails);
    }

    // Patch update for application details. Used for updating application status, favorite status, and archived status.
    public ApplicationDetailsDto patchApplicationDetails(Long id, JsonPatch patch) throws JsonPatchException, JsonProcessingException {
        ApplicationDetails applicationToUpdate = this.applicationDetailsRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        if (!applicationToUpdate.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found");
        }

        // Forcing initialization of lazy loaded user field to prevent not null constraint
        // validation error
        Hibernate.initialize(applicationToUpdate.getUser());

        JsonNode patched = patch.apply(objectMapper.convertValue(applicationToUpdate, JsonNode.class));
        ApplicationDetails updatedApplicationDetails = objectMapper.treeToValue(patched, ApplicationDetails.class);

        // TODO: Update to handle favorite
        applicationToUpdate.setStatus(updatedApplicationDetails.getStatus());
        
        return this.appDetailsMapper.toDto(applicationToUpdate);
    }

    public int deleteAllApplications(String userId) {
        return this.applicationDetailsRepository.deleteByUserId(userId);
    }

    public int deleteApplicationById(Long id, String userId) {
        return this.applicationDetailsRepository.deleteByIdAndUserId(id, userId);
    }

    // TODO: Use this to check if an application belongs to the currently logged in user
    protected boolean applicationBelongsToUser(Long applicationId) {
        ApplicationDetails applicationToUpdate = this.applicationDetailsRepository.findById(applicationId).orElseThrow(EntityNotFoundException::new);

        if (!applicationToUpdate.getUser().getId().equals(userFacade.getCurrentUserId())) {
            return false;
        }
        return true;
    }
}
