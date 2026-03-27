package com.project.backoffice.domain.admin

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Map<String, String>> {
        val token = authService.login(request.username, request.password)
        return ResponseEntity.ok(mapOf("token" to token))
    }

}
