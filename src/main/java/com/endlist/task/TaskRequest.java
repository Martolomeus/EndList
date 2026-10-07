package com.endlist.task;

import jakarta.validation.constraints.NotBlank;

public record TaskRequest(
        @NotBlank(message = "Subject is required")
        String subject,

        String description,

        Boolean completed
) {

}
