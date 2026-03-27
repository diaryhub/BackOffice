package com.project.backoffice.domain.version

import jakarta.persistence.*
import java.time.LocalDate
import java.time.OffsetDateTime

@Entity
@Table(name = "game_versions")
class GameVersion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "version", nullable = false, length = 20)
    var version: String,

    @Column(name = "patch_note", nullable = false, columnDefinition = "text")
    var patchNote: String,

    @Column(name = "release_date", nullable = false)
    var releaseDate: LocalDate,

    @Column(name = "created_at")
    val createdAt: OffsetDateTime = OffsetDateTime.now()
)
