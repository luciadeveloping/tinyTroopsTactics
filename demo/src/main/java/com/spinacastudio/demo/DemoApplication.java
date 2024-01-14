package com.spinacastudio.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class DemoApplication implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(@NonNull WebSocketHandlerRegistry registry) {
		registry.addHandler(appHandler(), "/app")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public WebsocketAppHandler appHandler(){
		return new WebsocketAppHandler();
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


}