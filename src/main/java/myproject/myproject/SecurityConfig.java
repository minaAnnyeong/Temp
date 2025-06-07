package myproject.myproject;

import jakarta.servlet.http.HttpServletResponse;
import myproject.myproject.service.MemberDetailsService;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity // 이하의 Request url들은 모두 Spring Security의 제어 하에 존재할 것.
public class SecurityConfig {

    /*
        password 암호화
    */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
        resources 접근 허용
    */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    /*
        csrf : 로컬 환경을 위해 비활성화 (옵션)
        authorizeHttpRequests : 로그인 없이 접근할 수 있는 페이지 주소
        formLogin : 로그인 페이지 커스터마이징

        ** 로그인 페이지에서 로그인을 할 때
        url 호출 없이 service를 이용할 수 있는 로직을 spring security 에서 제공한다.
        >> 별도의 controller 없이 기본 로그인 기능을 구현할 수 있다
        >>> 하지만 별도의 기능 추가 및 커스터마이징을 위해서는 controller 작성이 필요하다.
    */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                // **url 접근 허용 설정**
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/index.html", "/static/**",
                                "/api/members/**", "/signup", "/api/login", "/api/logout", "/error"
                        ).permitAll() // 로그인 여부에 상관없이 누구나 접근을 허용한다.
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        // .loginPage("/login") // 로그인 페이지 url 설정 (Get 호출방식). React로 로그인 페이지를 구성하므로 미사용
                        .loginProcessingUrl("/api/login") // 로그인 요청 url (endpoint) (Post 호출방식)
                        .usernameParameter("username")    // frontend의 로그인 폼과 파라미터 명 맞춤 (옵션)
                        .passwordParameter("password")
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK); // redirect x 프론트엔드에서 핸들링
                        }) // 로그인 성공 ->  return http '200 Ok'
                        .failureHandler((request, response, exception) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
                        }) // 로그인 실패 -> return http '401 Unauthorized'
                        // frontend 측 에서 error를 catch 할 수 있게 한다.
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }) // 로그아웃 성공 -> return http '200 Ok'
                );

        return http.build();
    }
}
