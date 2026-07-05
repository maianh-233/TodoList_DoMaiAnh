package com.todo.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.entity.User;
import com.todo.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    // Đăng ký
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        User newUser = userService.register(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {

        User loginUser = userService.login(user.getEmail(), user.getPassword());

        return ResponseEntity.ok(loginUser);
    }
}