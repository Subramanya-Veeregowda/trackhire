package com.lookjobs.controller;

import com.lookjobs.dto.JobDtos.JobResult;
import com.lookjobs.dto.JobDtos.JobSearchRequest;
import com.lookjobs.dto.SearchHistoryDto;
import com.lookjobs.service.JobSearchService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobSearchService jobSearchService;

    public JobController(JobSearchService jobSearchService) {
        this.jobSearchService = jobSearchService;
    }

    @PostMapping("/search")
    public List<JobResult> search(@Valid @RequestBody JobSearchRequest request) {
        return jobSearchService.search(request);
    }

    @GetMapping("/history")
    public List<SearchHistoryDto> history() {
        return jobSearchService.myHistory();
    }

    @GetMapping("/daily-digest")
    public List<JobResult> dailyDigest() {
        return jobSearchService.getLatestDailyDigest();
    }
}
