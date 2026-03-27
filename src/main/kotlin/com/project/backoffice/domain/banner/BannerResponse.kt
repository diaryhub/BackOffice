package com.project.backoffice.domain.banner

import java.time.OffsetDateTime

data class BannerResponse(
    val id: Int,
    val name: String,
    val startTime: OffsetDateTime,
    val endTime: OffsetDateTime,
    val cost: Int,
    val imageUrl: String?
) {
    companion object {
        fun from(banner: GachaBanner) = BannerResponse(
            id = banner.id,
            name = banner.name,
            startTime = banner.startTime,
            endTime = banner.endTime,
            cost = banner.cost,
            imageUrl = banner.imageUrl
        )
    }
}
