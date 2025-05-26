package myproject.myproject.controller;

import myproject.myproject.domain.Member;
import myproject.myproject.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
//    ResponseEntity<?>
    public Optional<?> create(@RequestBody Member member) {
        /*
        memberService.join(member); // db 등록
        return "redirect:/";
        */

        Member saved = memberService.registerMember(member);
        return Optional.of(saved);

    }

    // 전체 회원 조회
    @GetMapping("/")
    public List<Member> list() {
        return memberService.findMembers();
    }


}
