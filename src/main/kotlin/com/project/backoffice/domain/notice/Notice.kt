package com.project.backoffice.domain.notice

import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
@Table(name = "notices")
class Notice(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "title", nullable = false, length = 200)
    var title: String,

    @Column(name = "content", nullable = false, columnDefinition = "text")
    var content: String,

    @Column(name = "created_at")
    val createdAt: OffsetDateTime = OffsetDateTime.now()
)
