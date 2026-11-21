package com.endlist.task;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<TaskResponse> findAll() {
        return repository.findAll().stream().map(TaskResponse::from).toList();
    }

    public TaskResponse findById(Long id) {
        return TaskResponse.from(getTask(id));
    }

    public TaskResponse create(TaskRequest request) {
        Task task = new Task();
        apply(task, request);
        return TaskResponse.from(repository.save(task));
    }

    public TaskResponse update(Long id, TaskRequest request) {
        Task task = getTask(id);
        apply(task, request);
        return TaskResponse.from(repository.save(task));
    }

    public TaskResponse complete(Long id) {
        Task task = getTask(id);
        complete(task);
        return TaskResponse.from(repository.save(task));
    }

    public TaskResponse uncomplete(Long id) {
        Task task = getTask(id);
        uncomplete(task);
        return TaskResponse.from(repository.save(task));
    }

    public void delete(Long id) {
        repository.delete(getTask(id));
    }

    private Task getTask(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    private void apply(Task task, TaskRequest request) {
        task.setSubject(request.subject());
        task.setDescription(request.description());
    }

    private void complete(Task task) {
        task.setCompleted(true);
        task.setCompletedAt(Instant.now());
    }

    private void uncomplete(Task task) {
        task.setCompleted(false);
        task.setCompletedAt(null);
    }
}
