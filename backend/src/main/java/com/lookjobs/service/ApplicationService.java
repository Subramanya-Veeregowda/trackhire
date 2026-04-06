package com.lookjobs.service;

import com.lookjobs.dto.ApplicationDtos.ApplicationRequest;
import com.lookjobs.dto.ApplicationDtos.ApplicationResponse;
import com.lookjobs.entity.JobApplication;
import com.lookjobs.entity.User;
import com.lookjobs.exception.AppException;
import com.lookjobs.repository.ApplicationRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final CurrentUserService currentUserService;

    public ApplicationService(ApplicationRepository applicationRepository, CurrentUserService currentUserService) {
        this.applicationRepository = applicationRepository;
        this.currentUserService = currentUserService;
    }

    public List<ApplicationResponse> listMyApplications() {
        User user = currentUserService.getCurrentUser();
        return applicationRepository.findByUserOrderByDateAppliedDesc(user).stream().map(this::toDto).toList();
    }

    public ApplicationResponse create(ApplicationRequest request) {
        User user = currentUserService.getCurrentUser();
        JobApplication app = new JobApplication();
        map(app, request);
        app.setUser(user);
        return toDto(applicationRepository.save(app));
    }

    public ApplicationResponse update(Long id, ApplicationRequest request) {
        User user = currentUserService.getCurrentUser();
        JobApplication app = applicationRepository.findById(id).orElseThrow(() -> new AppException("Not found"));
        if (!app.getUser().getId().equals(user.getId())) throw new AppException("Forbidden");
        map(app, request);
        return toDto(applicationRepository.save(app));
    }

    public void delete(Long id) {
        User user = currentUserService.getCurrentUser();
        JobApplication app = applicationRepository.findById(id).orElseThrow(() -> new AppException("Not found"));
        if (!app.getUser().getId().equals(user.getId())) throw new AppException("Forbidden");
        applicationRepository.delete(app);
    }

    private void map(JobApplication app, ApplicationRequest req) {
        app.setCompanyName(req.companyName());
        app.setRole(req.role());
        app.setLocation(req.location());
        app.setDateApplied(req.dateApplied());
        app.setStatus(req.status());
        app.setNotes(req.notes());
    }

    private ApplicationResponse toDto(JobApplication app) {
        return new ApplicationResponse(
                app.getId(),
                app.getCompanyName(),
                app.getRole(),
                app.getLocation(),
                app.getDateApplied(),
                app.getStatus(),
                app.getNotes()
        );
    }
}
