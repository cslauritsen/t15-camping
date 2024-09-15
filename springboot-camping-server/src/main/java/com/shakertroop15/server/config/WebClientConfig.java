package com.shakertroop15.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import reactor.netty.transport.ProxyProvider;

import java.net.InetSocketAddress;
import java.util.List;

@Configuration
public class WebClientConfig {

    @Autowired
    Environment env;

    @Bean
    public WebClient webClient() {
        if (List.of(env.getActiveProfiles()).contains("zscaler")) {
            // With Proxy
            final var proxyHost = "192.168.1.156";
            final var proxyPort = 3128;
            final HttpClient httpClient = HttpClient
                    .create()
                    .proxy(proxy -> proxy.type(ProxyProvider.Proxy.HTTP)
                            .address(new InetSocketAddress(proxyHost, proxyPort)));
            ReactorClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);
            return WebClient.builder().clientConnector(connector).build();
        }
        return WebClient.create();
    }

}
