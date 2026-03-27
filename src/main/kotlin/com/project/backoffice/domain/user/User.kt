package com.project.backoffice.domain.user

import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
@Table(name = "users")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "nickname", nullable = false, length = 50)
    val nickname: String,

    @Column(name = "email", nullable = false, length = 100)
    val email: String,

    @Column(name = "password_hash", nullable = false, columnDefinition = "text")
    val passwordHash: String,

    @Column(name = "currency")
    var currency: Int = 0,

    @Column(name = "created_at")
    val createdAt: OffsetDateTime = OffsetDateTime.now()
)