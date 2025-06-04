package myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// Spring Security 기본 로그인 페이지 제외
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MyProjectApplication {

    public static void main(String[] args) {

        SpringApplication.run(MyProjectApplication.class, args);
    }

}
