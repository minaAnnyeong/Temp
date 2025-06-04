package myproject.myproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import myproject.myproject.domain.Member;
import myproject.myproject.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthController {

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    /*
        유저의 로그인 여부 login status를 체크 및
        로그인 된 유저의 이름member_name , 남은 세션 시간 정보를 반환
        (세션 타임아웃 : 60m)
     */
    @GetMapping("/api/session-info")
    public ResponseEntity<Map<String, Object>> getAuthInfo(HttpServletRequest request, Principal principal) {
        HttpSession session = request.getSession(false);
        Map<String, Object> response = new HashMap<>();

        if (session != null && principal != null) {
            long currentTime = System.currentTimeMillis();
            long creationTime = session.getCreationTime();
            int maxInactiveInterval = session.getMaxInactiveInterval(); // in seconds
            long expiryTime = creationTime + (maxInactiveInterval * 1000L);
            long timeLeftMillis = expiryTime - currentTime;

            long timeLeftSeconds = timeLeftMillis / 1000;
            long minutes = timeLeftSeconds / 60;
            long seconds = timeLeftSeconds % 60;


//          Spring Security로 로그인한 이메일정보를 기반으로 검색한 유저의 Member 객체 반환
            String username = principal.getName(); // input : "test@test.com"
            Optional<Member> optionalMember = memberService.findByEmail(username);
//            findMemberByEmail의 결과가 나올 경우
//            반환 JSON : {
//                          "loggedIn" : true,
//                          "username" : "유저이름",
//                          "minutes": 남음세션시간(분),
//                          "seconds": 남은세션시간(초)
//                        }
            if (optionalMember.isPresent()) {
                Member member = optionalMember.get();
                response.put("loggedIn", true);
                response.put("username", member.getName());
                response.put("minutes", minutes);   // time 정보: minutes, seconds 두개의 key로 나누어서 반환
                response.put("seconds", seconds);
            } else { // 이 외 경우 fallback
                response.put("loggedIn", false);
            }
        } else {
            response.put("loggedIn", false);
        }

        return ResponseEntity.ok(response);
    }

}



/*
    아래와 같이 보여지도록 한다.
    - 포지션 : Top-right .Navbar 내부
    <Show>
    - 비로그인 status
    {Navbar lists..    로그인 }
    - 로그인 status
    {Navbar lists..    홍길동 님 | 유효시간 58:38 | 로그아웃 }


    로그인 데이터 가져오기
    1. 세션, Session/JWT 에 저장된 정보 불러오기
    2. Spring Security - UsernamePasswordAuthenticationToken 클래스 사용하기

    Spring Security :
    Principal : 객체 위의 UsernamePasswordAuthenticationToken 클래스의 상위 인터페이스
        - 단순 로그인 유저네임 getName() 데이터를 가져오고 싶을 경우 사용.


    로그인 세션 만료시간 Session Timeout 정보 가져오기
    Spring Security 의 세션 관련 설정을 이용한다.
    세션만료시간 지정
        - application.properties > server.servlet.session.timeout={?}

    로그아웃
        - Spring Security의 세션 처리는 HttpSession이 기본으로 설정되어있으므로
        세션을 유지하는 데 사용되는 쿠키 객체를 삭제하면 자동으로 로그아웃이 된다.
            > 따라서, Spring Security가 기본 제공하는 기능을 기반으로 한
            로그아웃 링크를 누르면 자동 로그아웃(불가시) 및 로그인 페이지(기본탬플릿)이 로드된다.
*/
