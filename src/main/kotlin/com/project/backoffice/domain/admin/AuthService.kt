package com.project.backoffice.domain.admin

import com.project.backoffice.config.JwtProvider
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val adminRepository: AdminRepository,
    private val jwtProvider: JwtProvider
) {
    private val encoder = BCryptPasswordEncoder()

    fun login(username: String, password: String): String {
        val admin = adminRepository.findByUsername(username)
            ?: throw IllegalArgumentException("존재하지 않는 계정입니다.")
        require(encoder.matches(password, admin.passwordHash)) { "비밀번호가 올바르지 않습니다." }
        return jwtProvider.generate(username)
    }
}
