package com.project.backoffice.domain.user

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class UserService(
    private val userRepository: UserRepository
) {
    fun getAll(): List<UserResponse> =
        userRepository.findAll().map { UserResponse.from(it) }

    fun getById(id: Int): UserResponse =
        UserResponse.from(userRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("User not found: $id"))

    @Transactional
    fun grantCurrency(id: Int, amount: Int): UserResponse {
        val user = userRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("User not found: $id")
        require(amount > 0) { "Amount must be positive" }
        user.currency += amount
        return UserResponse.from(user)
    }

    @Transactional
    fun revokeCurrency(id: Int, amount: Int): UserResponse {
        val user = userRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("User not found: $id")
        require(amount > 0) { "Amount must be positive" }
        require(user.currency >= amount) { "Insufficient currency" }
        user.currency -= amount
        return UserResponse.from(user)
    }
}
