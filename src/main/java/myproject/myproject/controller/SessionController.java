package myproject.myproject.controller;

import lombok.extern.slf4j.Slf4j;
import myproject.myproject.domain.MemberDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class SessionController {

    @ResponseBody
    @GetMapping("/session-info")
    public Map<String, Object> getSessionInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        /*
            Log
        */
        log.info("로그인 아이디 (memberEmail): "+auth.getName());
        log.info("로그인 T/F: "+String.valueOf(auth.isAuthenticated()));

        Map<String, Object> sessionInfo = new HashMap<String, Object>();

        if (auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)) {
            Object principal = auth.getPrincipal();
            log.info("principal type: {}", principal.getClass().getName());

            if (principal instanceof MemberDetails memberDetails) {
                log.info("표시 이름: {}", memberDetails.getDisplayName());
                sessionInfo.put("username", memberDetails.getDisplayName());
                sessionInfo.put("loggedIn", true);
            }
        } else {
            log.info("로그인 실패! : Login failed");
            sessionInfo.put("loggedIn", false);
        }

        return sessionInfo;
    }
    
    /*
        마이페이지
    */

}
