package com.project.backoffice.domain.banner

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/banners")
class BannerController(
    private val bannerService: BannerService
) {
    @GetMapping
    fun getAll() = bannerService.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Int) = bannerService.getById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: BannerRequest) = bannerService.create(request)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Int, @RequestBody request: BannerRequest) =
        bannerService.update(id, request)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: Int) = bannerService.delete(id)
}
