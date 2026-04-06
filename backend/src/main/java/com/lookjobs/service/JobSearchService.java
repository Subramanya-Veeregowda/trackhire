package com.lookjobs.service;

import com.lookjobs.dto.JobDtos.JobResult;
import com.lookjobs.dto.JobDtos.JobSearchRequest;
import com.lookjobs.dto.SearchHistoryDto;
import com.lookjobs.entity.SearchHistory;
import com.lookjobs.entity.User;
import com.lookjobs.repository.SearchHistoryRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JobSearchService {
    private final RestTemplate restTemplate;
    private final CurrentUserService currentUserService;
    private final SearchHistoryRepository searchHistoryRepository;
    private final String jobsBaseUrl;
    private final List<JobResult> latestDailyDigest = new ArrayList<>();

    public JobSearchService(
            RestTemplate restTemplate,
            CurrentUserService currentUserService,
            SearchHistoryRepository searchHistoryRepository,
            @Value("${app.jobs.api.base-url}") String jobsBaseUrl) {
        this.restTemplate = restTemplate;
        this.currentUserService = currentUserService;
        this.searchHistoryRepository = searchHistoryRepository;
        this.jobsBaseUrl = jobsBaseUrl;
    }

    public List<JobResult> search(JobSearchRequest request) {
        User user = currentUserService.getCurrentUser();
        saveSearchHistory(user, request);
        return fetch(request.role(), request.location(), request.experience());
    }

    public List<SearchHistoryDto> myHistory() {
        User user = currentUserService.getCurrentUser();
        return searchHistoryRepository.findTop10ByUserOrderByIdDesc(user).stream()
                .map(h -> new SearchHistoryDto(h.getRole(), h.getLocation(), h.getExperience()))
                .toList();
    }

    public List<JobResult> getLatestDailyDigest() {
        synchronized (latestDailyDigest) {
            return List.copyOf(latestDailyDigest);
        }
    }

    @Scheduled(cron = "0 0 6 * * *")
    public void dailyFetch() {
        List<JobResult> fetched = fetch("intern OR developer", "remote", "fresher");
        synchronized (latestDailyDigest) {
            latestDailyDigest.clear();
            latestDailyDigest.addAll(fetched.stream().limit(30).toList());
        }
    }

    @SuppressWarnings("unchecked")
    private List<JobResult> fetch(String role, String location, String experience) {
        String url = jobsBaseUrl + "?search=" + role;
        Map<String, Object> resp = restTemplate.getForObject(url, Map.class);
        if (resp == null || !resp.containsKey("jobs")) return List.of();

        List<Map<String, Object>> jobs = (List<Map<String, Object>>) resp.get("jobs");
        return jobs.stream()
                .map(this::toJob)
                .filter(j -> containsIgnoreCase(j.location(), location))
                .filter(j -> containsIgnoreCase(j.title() + " " + j.description(), experience))
                .limit(50)
                .toList();
    }

    private JobResult toJob(Map<String, Object> raw) {
        return new JobResult(
                String.valueOf(raw.getOrDefault("id", "")),
                String.valueOf(raw.getOrDefault("title", "")),
                String.valueOf(raw.getOrDefault("company_name", "")),
                String.valueOf(raw.getOrDefault("candidate_required_location", "")),
                String.valueOf(raw.getOrDefault("job_type", "UNKNOWN")),
                String.valueOf(raw.getOrDefault("description", "")),
                String.valueOf(raw.getOrDefault("url", "")),
                Instant.now()
        );
    }

    private boolean containsIgnoreCase(String source, String filter) {
        if (filter == null || filter.isBlank()) return true;
        return source != null && source.toLowerCase().contains(filter.toLowerCase());
    }

    private void saveSearchHistory(User user, JobSearchRequest request) {
        SearchHistory h = new SearchHistory();
        h.setUser(user);
        h.setRole(request.role());
        h.setLocation(request.location() == null ? "" : request.location());
        h.setExperience(request.experience() == null ? "" : request.experience());
        searchHistoryRepository.save(h);
    }
}
