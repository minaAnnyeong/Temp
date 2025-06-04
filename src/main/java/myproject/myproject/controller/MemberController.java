package myproject.myproject.controller;

import myproject.myproject.domain.Member;
import myproject.myproject.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    // Controller - Service 연결
    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> create(@RequestBody Member member) {
        Map <String, String> response = new HashMap<>();

        try {
            memberService.registerMember(member);
            response.put("message", "회원가입 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "회원가입 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 전체 회원 조회
    @GetMapping("/")
    public List<Member> list() {
        return memberService.findMembers();
    }


}
