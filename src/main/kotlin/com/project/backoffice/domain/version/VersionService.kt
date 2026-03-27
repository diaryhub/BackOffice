package com.project.backoffice.domain.version

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class VersionService(
    private val versionRepository: VersionRepository
) {
    fun getAll(): List<VersionResponse> =
        versionRepository.findAll()
            .sortedByDescending { it.releaseDate }
            .map { VersionResponse.from(it) }

    fun getById(id: Int): VersionResponse =
        VersionResponse.from(versionRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("Version not found: $id"))

    @Transactional
    fun create(request: VersionRequest): VersionResponse {
        val entity = GameVersion(
            version = request.version,
            patchNote = request.patchNote,
            releaseDate = request.releaseDate
        )
        return VersionResponse.from(versionRepository.save(entity))
    }

    @Transactional
    fun update(id: Int, request: VersionRequest): VersionResponse {
        val entity = versionRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("Version not found: $id")
        entity.version = request.version
        entity.patchNote = request.patchNote
        entity.releaseDate = request.releaseDate
        return VersionResponse.from(entity)
    }

    @Transactional
    fun delete(id: Int) = versionRepository.deleteById(id)
}
