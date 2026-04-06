package com.lookjobs.repository;

import com.lookjobs.entity.ApplicationStatus;
import com.lookjobs.entity.JobApplication;
import com.lookjobs.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserOrderByDateAppliedDesc(User user);
    long countByUser(User user);
    long countByUserAndStatus(User user, ApplicationStatus status);
}
