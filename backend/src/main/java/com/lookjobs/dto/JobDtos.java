package com.lookjobs.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public class JobDtos {
    public record JobSearchRequest(
            @NotBlank String role,
            String location,
            String experience
    ) {}

    public record JobResult(
            String externalId,
            String title,
            String company,
            String location,
            String type,
            String description,
            String applyUrl,
            Instant postedAt
    ) {}

    public record SavedJobRequest(
            @NotBlank String externalId,
            @NotBlank String title,
            @NotBlank String company,
            @NotBlank String location,
            @NotBlank String url
    ) {}

    public record SavedJobResponse(
            Long id,
            String externalId,
            String title,
            String company,
            String location,
            String url
    ) {}
}
