package com.lookjobs.repository;

import com.lookjobs.entity.SearchHistory;
import com.lookjobs.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findTop10ByUserOrderByIdDesc(User user);
}
