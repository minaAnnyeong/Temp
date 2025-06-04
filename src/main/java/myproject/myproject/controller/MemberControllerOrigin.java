//package myproject.myproject.controller;
//
//import myproject.myproject.domain.Member;
//import myproject.myproject.service.MemberService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
////@Controller
//@CrossOrigin
//@RestController
//@RequestMapping("api/members")
//public class MemberController11 {
//
//    private final MemberService memberService;
//
//    // Controller - Service 연결
//    @Autowired
//    public MemberController11(MemberService memberService) {
//        this.memberService = memberService;
//    }
//
//    // 회원 가입
////    @GetMapping("/members/new")
//    @GetMapping("/new")
//    public String createForm(){
//        return "members/new";
//       // return "members/createMemberForm";
//    }
//
////    @PostMapping("/members/new")
//    @PostMapping("/new")
//    public String create(@RequestBody MemberForm form){
//        Member member = new Member();
//        member.setName(form.getName()); // 사용자 input Get
//        member.setEmail(form.getEmail());
//        member.setPassword(form.getPassword());
//
//        memberService.join(member); // 등록
//
//        return "redirect:/"; // 마치면 리디랙션
//    }
//
//    // 회원 조회
//    @GetMapping("/members")
//    public String list(Model model){
//        List<Member> members = memberService.findMembers();
//        model.addAttribute("members", members);
//        // 조회 결과 List -> Model에 담아 반환
//        return "members/memberList";
//    }
//
//}
