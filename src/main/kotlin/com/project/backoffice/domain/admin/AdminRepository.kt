package com.project.backoffice.domain.admin

import org.springframework.data.jpa.repository.JpaRepository

interface AdminRepository : JpaRepository<Admin, Int> {
    fun findByUsername(username: String): Admin?
}
