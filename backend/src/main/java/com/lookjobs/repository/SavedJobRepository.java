package com.lookjobs.repository;

import com.lookjobs.entity.SavedJob;
import com.lookjobs.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByUserOrderByIdDesc(User user);
    Optional<SavedJob> findByUserAndExternalId(User user, String externalId);
}
