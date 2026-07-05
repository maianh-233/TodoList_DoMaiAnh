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
}