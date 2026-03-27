package com.project.backoffice.domain.version

import java.time.LocalDate

data class VersionRequest(
    val version: String,
    val patchNote: String,
    val releaseDate: LocalDate
)
