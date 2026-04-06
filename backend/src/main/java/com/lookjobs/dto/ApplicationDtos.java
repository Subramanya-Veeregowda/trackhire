package com.lookjobs.dto;

import com.lookjobs.entity.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class ApplicationDtos {
    public record ApplicationRequest(
            @NotBlank String companyName,
            @NotBlank String role,
            @NotBlank String location,
            @NotNull LocalDate dateApplied,
            @NotNull ApplicationStatus status,
            String notes
    ) {}

    public record ApplicationResponse(
            Long id,
            String companyName,
            String role,
            String location,
            LocalDate dateApplied,
            ApplicationStatus status,
            String notes
    ) {}
}
