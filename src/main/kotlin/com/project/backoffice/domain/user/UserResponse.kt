package com.project.backoffice.domain.user

import java.time.OffsetDateTime

data class UserResponse(
    val id: Int,
    val nickname: String,
    val email: String,
    val currency: Int,
    val createdAt: OffsetDateTime
) {
    companion object {
        fun from(user: User) = UserResponse(
            id = user.id,
            nickname = user.nickname,
            email = user.email,
            currency = user.currency,
            createdAt = user.createdAt
        )
    }
}
