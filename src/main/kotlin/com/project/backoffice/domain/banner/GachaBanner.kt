package com.project.backoffice.domain.banner

import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
@Table(name = "gacha_banners")
class GachaBanner(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "name", nullable = false, columnDefinition = "text")
    var name: String,

    @Column(name = "start_time")
    var startTime: OffsetDateTime,

    @Column(name = "end_time")
    var endTime: OffsetDateTime,

    @Column(name = "cost")
    var cost: Int = 0,

    @Column(name = "image_url", columnDefinition = "text")
    var imageUrl: String? = null
)
