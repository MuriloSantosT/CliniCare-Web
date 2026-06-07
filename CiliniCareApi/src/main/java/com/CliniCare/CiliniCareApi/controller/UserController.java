package com.CliniCare.CiliniCareApi.controller;

import com.CliniCare.CiliniCareApi.dto.LoginRequest;
import com.CliniCare.CiliniCareApi.dto.RegisterRequest;
import com.CliniCare.CiliniCareApi.dto.UserResponse;
import com.CliniCare.CiliniCareApi.model.User;
import com.CliniCare.CiliniCareApi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUsers")
    public List<User> getAll() {
        return userService.getAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserResponse response = userService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            UserResponse response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam Long id) {
        userService.delete(id);
    }
}
