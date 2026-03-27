package com.project.backoffice.domain.banner

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class BannerService(
    private val bannerRepository: BannerRepository
) {
    fun getAll(): List<BannerResponse> =
        bannerRepository.findAll().map { BannerResponse.from(it) }

    fun getById(id: Int): BannerResponse =
        BannerResponse.from(bannerRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("Banner not found: $id"))

    @Transactional
    fun create(request: BannerRequest): BannerResponse {
        require(request.endTime.isAfter(request.startTime)) { "endTime must be after startTime" }
        require(request.cost >= 0) { "cost must be non-negative" }
        val banner = GachaBanner(
            name = request.name,
            startTime = request.startTime,
            endTime = request.endTime,
            cost = request.cost,
            imageUrl = request.imageUrl
        )
        return BannerResponse.from(bannerRepository.save(banner))
    }

    @Transactional
    fun update(id: Int, request: BannerRequest): BannerResponse {
        val banner = bannerRepository.findByIdOrNull(id)
            ?: throw NoSuchElementException("Banner not found: $id")
        require(request.endTime.isAfter(request.startTime)) { "endTime must be after startTime" }
        require(request.cost >= 0) { "cost must be non-negative" }
        banner.name = request.name
        banner.startTime = request.startTime
        banner.endTime = request.endTime
        banner.cost = request.cost
        banner.imageUrl = request.imageUrl
        return BannerResponse.from(banner)
    }

    @Transactional
    fun delete(id: Int) = bannerRepository.deleteById(id)
}
