package com.project.backoffice.config

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtProvider(
    @Value("\${jwt.secret}") private val secret: String,
    @Value("\${jwt.expiration}") private val expiration: Long
) {
    private val key by lazy { Keys.hmacShaKeyFor(secret.toByteArray()) }

    fun generate(username: String): String = Jwts.builder()
        .subject(username)
        .issuedAt(Date())
        .expiration(Date(System.currentTimeMillis() + expiration))
        .signWith(key)
        .compact()

    fun validate(token: String): String? = runCatching {
        Jwts.parser().verifyWith(key).build()
            .parseSignedClaims(token).payload.subject
    }.getOrNull()
}
