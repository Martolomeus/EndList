package com.endlist.task;

import java.time.Instant;

public record TaskResponse(
        Long id,

        String subject,

        String description,

        boolean completed,

        Instant completedAt
) {

    static TaskResponse from(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getSubject(),
                task.getDescription(),
                task.isCompleted(),
                task.getCompletedAt()
        );
    }
}
