package myproject.myproject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Password 암호화 저장
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF off for testing, enable in prod
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("index.html",
                                "/api/members/**",
                                "/static/**",
                                "/login",
                                "/signup",
                                "/",
                                "/error").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable()); // Frontend handles login

        return http.build();
    }

}
