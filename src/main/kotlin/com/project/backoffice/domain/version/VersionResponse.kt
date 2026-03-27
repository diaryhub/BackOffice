package com.project.backoffice.domain.version

import java.time.LocalDate

data class VersionResponse(
    val id: Int,
    val version: String,
    val patchNote: String,
    val releaseDate: LocalDate
) {
    companion object {
        fun from(v: GameVersion) = VersionResponse(
            id = v.id,
            version = v.version,
            patchNote = v.patchNote,
            releaseDate = v.releaseDate
        )
    }
}
