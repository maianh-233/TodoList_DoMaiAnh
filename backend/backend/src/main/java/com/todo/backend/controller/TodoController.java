package com.todo.backend.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.entity.Todo;
import com.todo.backend.entity.User;
import com.todo.backend.repository.UserRepository;
import com.todo.backend.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;
    private final UserRepository userRepository;

    // Hiển thị danh sách có phân trang
    @GetMapping
    public Page<Todo> getTodos(
            @RequestParam UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.getTodos(user, page, size);
    }

    // Thêm công việc
    @PostMapping
    public Todo createTodo(
            @RequestParam UUID userId,
            @RequestBody Todo todo) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.createTodo(user, todo);
    }

    // Cập nhật công việc
    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable UUID id,
            @RequestParam UUID userId,
            @RequestBody Todo todo) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.updateTodo(user, id, todo);
    }

    // Xóa công việc
    @DeleteMapping("/{id}")
    public String deleteTodo(
            @PathVariable UUID id,
            @RequestParam UUID userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        todoService.deleteTodo(user, id);

        return "Delete successfully";
    }

    // Đánh dấu hoàn thành / chưa hoàn thành
    @PatchMapping("/{id}/toggle")
    public Todo toggleCompleted(
            @PathVariable UUID id,
            @RequestParam UUID userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.toggleCompleted(user, id);
    }

    // Tìm kiếm
    @GetMapping("/search")
    public Page<Todo> search(
            @RequestParam UUID userId,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.search(user, keyword, page, size);
    }

    // Lọc theo trạng thái
    @GetMapping("/filter")
    public Page<Todo> filter(
            @RequestParam UUID userId,
            @RequestParam Boolean completed,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.filter(user, completed, page, size);
    }

    // Lọc theo priority
    @GetMapping("/priority")
    public Page<Todo> filterByPriority(
            @RequestParam UUID userId,
            @RequestParam String priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.filterByPriority(user, priority, page, size);
    }

    // Lọc theo thời gian
    @GetMapping("/time")
    public Page<Todo> filterByTime(
            @RequestParam UUID userId,
            @RequestParam String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return todoService.filterByTime(user, type, page, size);
    }
}
