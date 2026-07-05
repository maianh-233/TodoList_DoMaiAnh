package com.todo.backend.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.todo.backend.entity.Todo;
import com.todo.backend.entity.User;
import com.todo.backend.repository.TodoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    // Hiển thị danh sách có phân trang
    public Page<Todo> getTodos(User user, int page, int size) {
        return todoRepository.findByUser(user, PageRequest.of(page, size));
    }

    // Thêm công việc mới
    public Todo createTodo(User user, Todo todo) {
        todo.setUser(user);
        todo.setCompleted(false);

        return todoRepository.save(todo);
    }

    // Chỉnh sửa công việc
    public Todo updateTodo(User user, UUID id, Todo newTodo) {

        Todo todo = findTodoByIdAndUser(user, id);

        todo.setTitle(newTodo.getTitle());
        todo.setDescription(newTodo.getDescription());
        todo.setPriority(newTodo.getPriority());
        todo.setDueDate(newTodo.getDueDate());

        return todoRepository.save(todo);
    }

    // Xóa công việc
    public void deleteTodo(User user, UUID id) {

        Todo todo = findTodoByIdAndUser(user, id);

        todoRepository.delete(todo);
    }

    // Đánh dấu hoàn thành/chưa hoàn thành
    public Todo toggleCompleted(User user, UUID id) {

        Todo todo = findTodoByIdAndUser(user, id);

        todo.setCompleted(!todo.getCompleted());

        return todoRepository.save(todo);
    }

    // Tìm kiếm theo tiêu đề
    public Page<Todo> search(User user, String keyword, int page, int size) {

        return todoRepository.findByUserAndTitleContainingIgnoreCase(
                user,
                keyword,
                PageRequest.of(page, size)
        );
    }

    // Lọc theo trạng thái
    public Page<Todo> filter(User user, Boolean completed, int page, int size) {

        return todoRepository.findByUserAndCompleted(
                user,
                completed,
                PageRequest.of(page, size)
        );
    }

    // Hàm dùng chung
    private Todo findTodoByIdAndUser(User user, UUID id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return todo;
    }
}