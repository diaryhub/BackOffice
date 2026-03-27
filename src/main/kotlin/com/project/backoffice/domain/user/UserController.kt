package com.project.backoffice.domain.user

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {
    @GetMapping
    fun getAll() = userService.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Int) = userService.getById(id)

    @PostMapping("/{id}/currency/grant")
    fun grantCurrency(@PathVariable id: Int, @RequestBody request: CurrencyRequest) =
        userService.grantCurrency(id, request.amount)

    @PostMapping("/{id}/currency/revoke")
    fun revokeCurrency(@PathVariable id: Int, @RequestBody request: CurrencyRequest) =
        userService.revokeCurrency(id, request.amount)
}