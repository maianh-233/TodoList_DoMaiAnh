package com.todo.backend.config.dotenv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.ResourcePropertySource;

public class EnvDotenvPostProcessor implements EnvironmentPostProcessor, Ordered {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // Load backend/backend/.env into Spring Environment very early.
        // This ensures ${DB_URL} etc are available before datasource is created.
        try {
            PropertySource<?> ps = new ResourcePropertySource("file:./.env");
            MutablePropertySources sources = environment.getPropertySources();
            sources.addFirst(ps);

            // Also set into system properties for safety.
            String dbUrl = environment.getProperty("DB_URL");
            String dbUsername = environment.getProperty("DB_USERNAME");
            String dbPassword = environment.getProperty("DB_PASSWORD");

            if (dbUrl != null) System.setProperty("DB_URL", dbUrl);

            if (dbUsername != null) System.setProperty("DB_USERNAME", dbUsername);
            if (dbPassword != null) System.setProperty("DB_PASSWORD", dbPassword);
        } catch (Exception ignored) {
            // ignore if .env not found
        }
    }


    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}

