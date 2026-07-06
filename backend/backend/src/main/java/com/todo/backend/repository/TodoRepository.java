package com.todo.backend.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.backend.entity.Todo;
import com.todo.backend.entity.User;

public interface TodoRepository extends JpaRepository<Todo, UUID> {

    Page<Todo> findByUser(User user, Pageable pageable);

    Page<Todo> findByUserAndCompleted(User user, Boolean completed, Pageable pageable);

    Page<Todo> findByUserAndTitleContainingIgnoreCase(User user, String keyword, Pageable pageable);

    Page<Todo> findByUserAndPriority(User user, String priority, Pageable pageable);

    // dueDate filtering
    Page<Todo> findByUserAndDueDateBetween(
            User user,
            java.time.LocalDate start,
            java.time.LocalDate end,
            Pageable pageable);

    Page<Todo> findByUserAndDueDateBeforeAndCompleted(
            User user,
            java.time.LocalDate date,
            Boolean completed,
            Pageable pageable);

    // Variation used for upcoming where we *don't* necessarily filter by completed.
    Page<Todo> findByUserAndDueDateAfterAndDueDateLessThanEqual(
            User user,
            java.time.LocalDate after,
            java.time.LocalDate lessThanEqual,
            Pageable pageable);

}
