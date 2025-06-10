package myproject.myproject.controller;

import lombok.RequiredArgsConstructor;
import myproject.myproject.domain.Member;
import myproject.myproject.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getMyInfo(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Member member = memberRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        Map<String, Object> result = new HashMap<>();
        result.put("email", member.getEmail());
        result.put("username", member.getName());
        return ResponseEntity.ok(result);
    }

    @PutMapping
    public ResponseEntity<?> updateMyInfo(@RequestBody Map<String, String> req, Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Member member = memberRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        member.setEmail(req.get("email"));
        member.setName(req.get("username"));

        if(req.get("password") != null && !req.get("password").equals("")) {
            member.setPassword(passwordEncoder.encode(req.get("password")));
        }

        memberRepository.save(member);

        return ResponseEntity.ok().build();
    }


    @DeleteMapping
    public ResponseEntity<?> deleteMyInfo(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Member member = memberRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        memberRepository.delete(member);

        return ResponseEntity.ok().build();
    }

}
