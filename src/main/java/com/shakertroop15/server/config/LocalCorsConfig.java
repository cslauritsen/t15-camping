package com.shakertroop15.server.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Log4j2
@Configuration
@Profile({"local", "default"})
public class LocalCorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        log.info("Configuring CORS");
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("http://localhost:8081");
        config.addAllowedOrigin("http://localhost:9080");
        config.addAllowedOrigin("http://192.168.1.138:3000");
        config.addAllowedOrigin("http://t15.camping:3000");
        config.addAllowedOrigin("http://localhost");
        config.addAllowedOrigin("https://localhost");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
