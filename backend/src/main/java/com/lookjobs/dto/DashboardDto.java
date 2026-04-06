package com.lookjobs.dto;

public record DashboardDto(
        long totalApplied,
        long interviews,
        long offers,
        long rejections
) {}
