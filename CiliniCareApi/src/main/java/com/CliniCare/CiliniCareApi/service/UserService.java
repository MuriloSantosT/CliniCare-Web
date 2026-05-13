package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.dto.LoginRequest;
import com.CliniCare.CiliniCareApi.dto.RegisterRequest;
import com.CliniCare.CiliniCareApi.dto.UserResponse;
import com.CliniCare.CiliniCareApi.model.User;
import com.CliniCare.CiliniCareApi.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(request.getEmail());
        user.setSenhaHash(encoder.encode(request.getSenha()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);
        return new UserResponse(saved.getId(), saved.getNome(), saved.getEmail());
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (!encoder.matches(request.getSenha(), user.getSenhaHash())) {
            throw new RuntimeException("Senha incorreta");
        }
        return new UserResponse(user.getId(), user.getNome(), user.getEmail());
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
