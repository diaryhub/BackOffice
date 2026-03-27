package com.project.backoffice.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class SpaForwardingConfig : WebMvcConfigurer {
    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/{path:[^\\.]*}").setViewName("forward:/index.html")
        registry.addViewController("/**/{path:[^\\.]*}").setViewName("forward:/index.html")
    }
}
