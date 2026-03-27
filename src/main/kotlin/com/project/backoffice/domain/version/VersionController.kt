package com.project.backoffice.domain.version

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/versions")
class VersionController(
    private val versionService: VersionService
) {
    @GetMapping
    fun getAll() = versionService.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Int) = versionService.getById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: VersionRequest) = versionService.create(request)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Int, @RequestBody request: VersionRequest) =
        versionService.update(id, request)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: Int) = versionService.delete(id)
}
