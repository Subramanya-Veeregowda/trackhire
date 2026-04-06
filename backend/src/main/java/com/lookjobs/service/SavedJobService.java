package com.lookjobs.service;

import com.lookjobs.dto.JobDtos.SavedJobRequest;
import com.lookjobs.dto.JobDtos.SavedJobResponse;
import com.lookjobs.entity.SavedJob;
import com.lookjobs.entity.User;
import com.lookjobs.exception.AppException;
import com.lookjobs.repository.SavedJobRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SavedJobService {
    private final SavedJobRepository savedJobRepository;
    private final CurrentUserService currentUserService;

    public SavedJobService(SavedJobRepository savedJobRepository, CurrentUserService currentUserService) {
        this.savedJobRepository = savedJobRepository;
        this.currentUserService = currentUserService;
    }

    public List<SavedJobResponse> list() {
        User user = currentUserService.getCurrentUser();
        return savedJobRepository.findByUserOrderByIdDesc(user).stream().map(this::toDto).toList();
    }

    public SavedJobResponse save(SavedJobRequest req) {
        User user = currentUserService.getCurrentUser();
        SavedJob saved = savedJobRepository.findByUserAndExternalId(user, req.externalId()).orElseGet(SavedJob::new);
        saved.setUser(user);
        saved.setExternalId(req.externalId());
        saved.setTitle(req.title());
        saved.setCompany(req.company());
        saved.setLocation(req.location());
        saved.setUrl(req.url());
        return toDto(savedJobRepository.save(saved));
    }

    public void delete(Long id) {
        User user = currentUserService.getCurrentUser();
        SavedJob job = savedJobRepository.findById(id).orElseThrow(() -> new AppException("Saved job not found"));
        if (!job.getUser().getId().equals(user.getId())) throw new AppException("Forbidden");
        savedJobRepository.delete(job);
    }

    private SavedJobResponse toDto(SavedJob saved) {
        return new SavedJobResponse(saved.getId(), saved.getExternalId(), saved.getTitle(),
                saved.getCompany(), saved.getLocation(), saved.getUrl());
    }
}
