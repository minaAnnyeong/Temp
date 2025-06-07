package myproject.myproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    //@RequestMapping(value = {"/{path:[^\\.]*}", "/**/{path:[^\\.]*}"})
    @RequestMapping(value = {
            "/",
            "/signup",
            "/login"
    })
    public String forwardToFrontend() {
        return "forward:/index.html";
    }
}
