package com.project.backoffice.domain.notice

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class NoticeService(
    private val noticeRepository: NoticeRepository
) {
    fun getAll(): List<NoticeResponse> =
        noticeRepository.findAll().map { NoticeResponse.from(it) }

    fun getById(id: Int): NoticeResponse =
        NoticeResponse.from(noticeRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("Notice not found: $id"))

    @Transactional
    fun create(title: String, content: String): NoticeResponse =
        NoticeResponse.from(noticeRepository.save(Notice(title = title, content = content)))

    @Transactional
    fun update(id: Int, title: String, content: String): NoticeResponse {
        val notice = noticeRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("Notice not found: $id")
        notice.title = title
        notice.content = content
        return NoticeResponse.from(notice)
    }

    @Transactional
    fun delete(id: Int) = noticeRepository.deleteById(id)
}
