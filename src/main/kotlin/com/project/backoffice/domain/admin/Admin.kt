package com.project.backoffice.domain.admin

import jakarta.persistence.*

@Entity
@Table(name = "admins")
class Admin(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "username", nullable = false, unique = true, length = 50)
    val username: String,

    @Column(name = "password_hash", nullable = false, columnDefinition = "text")
    val passwordHash: String
)
