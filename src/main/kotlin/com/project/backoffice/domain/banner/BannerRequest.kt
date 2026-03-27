package com.project.backoffice.domain.banner

import java.time.OffsetDateTime

data class BannerRequest(
    val name: String,
    val startTime: OffsetDateTime,
    val endTime: OffsetDateTime,
    val cost: Int,
    val imageUrl: String? = null
)
