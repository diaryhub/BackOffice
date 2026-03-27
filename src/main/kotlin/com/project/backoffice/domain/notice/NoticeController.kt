package com.project.backoffice.domain.notice

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/notices")
class NoticeController(
    private val noticeService: NoticeService
) {
    @GetMapping
    fun getAll() = noticeService.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Int) = noticeService.getById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: NoticeRequest) =
        noticeService.create(request.title, request.content)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Int, @RequestBody request: NoticeRequest) =
        noticeService.update(id, request.title, request.content)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: Int) = noticeService.delete(id)
}
