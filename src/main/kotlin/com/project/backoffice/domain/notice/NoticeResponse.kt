package com.project.backoffice.domain.notice

import java.time.OffsetDateTime

data class NoticeResponse(
    val id: Int,
    val title: String,
    val content: String,
    val createdAt: OffsetDateTime
) {
    companion object {
        fun from(notice: Notice) = NoticeResponse(
            id = notice.id,
            title = notice.title,
            content = notice.content,
            createdAt = notice.createdAt
        )
    }
}
