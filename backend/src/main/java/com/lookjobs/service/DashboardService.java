package com.lookjobs.service;

import com.lookjobs.dto.DashboardDto;
import com.lookjobs.entity.ApplicationStatus;
import com.lookjobs.entity.User;
import com.lookjobs.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private final CurrentUserService currentUserService;
    private final ApplicationRepository applicationRepository;

    public DashboardService(CurrentUserService currentUserService, ApplicationRepository applicationRepository) {
        this.currentUserService = currentUserService;
        this.applicationRepository = applicationRepository;
    }

    public DashboardDto getMyDashboard() {
        User user = currentUserService.getCurrentUser();
        return new DashboardDto(
                applicationRepository.countByUser(user),
                applicationRepository.countByUserAndStatus(user, ApplicationStatus.INTERVIEW),
                applicationRepository.countByUserAndStatus(user, ApplicationStatus.OFFER),
                applicationRepository.countByUserAndStatus(user, ApplicationStatus.REJECTED)
        );
    }
}
