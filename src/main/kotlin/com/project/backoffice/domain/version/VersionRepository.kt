package com.project.backoffice.domain.version

import org.springframework.data.jpa.repository.JpaRepository

interface VersionRepository : JpaRepository<GameVersion, Int>
