package myproject.myproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    // 백엔드 index.html로 forward
    // then, React Router가 Home.jsx를 핸들 및 렌더링
    @GetMapping("/")
    public String home() {
        return "forward:/index.html"; // Let React handle the UI
    }
}


/*package myproject.myproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }
}*/
