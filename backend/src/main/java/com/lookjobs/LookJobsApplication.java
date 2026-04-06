package com.lookjobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LookJobsApplication {
    public static void main(String[] args) {
        SpringApplication.run(LookJobsApplication.class, args);
    }
}
