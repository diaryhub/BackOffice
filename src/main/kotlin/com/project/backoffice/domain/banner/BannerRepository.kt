package com.project.backoffice.domain.banner

import org.springframework.data.jpa.repository.JpaRepository

interface BannerRepository : JpaRepository<GachaBanner, Int>
