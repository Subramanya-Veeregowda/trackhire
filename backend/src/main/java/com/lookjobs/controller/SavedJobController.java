package com.lookjobs.controller;

import com.lookjobs.dto.JobDtos.SavedJobRequest;
import com.lookjobs.dto.JobDtos.SavedJobResponse;
import com.lookjobs.service.SavedJobService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {
    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @GetMapping
    public List<SavedJobResponse> list() {
        return savedJobService.list();
    }

    @PostMapping
    public ResponseEntity<SavedJobResponse> save(@Valid @RequestBody SavedJobRequest request) {
        return ResponseEntity.ok(savedJobService.save(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        savedJobService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
