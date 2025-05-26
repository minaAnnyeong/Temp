package myproject.myproject.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import jakarta.transaction.Transactional;
import myproject.myproject.domain.Member;
import myproject.myproject.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class MemberServiceIntegrationTest {

    @Autowired
    MemberService memberService;
//    @Autowired
//    MemberRepository memberRepository;

    @Test
    void 회원가입(){
        // given
        Member member = new Member();
        member.setName("test");
        member.setEmail("test@test");
        member.setPassword("test");

        // when
        Long saveId = memberService.join(member);

        // then
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
        assertThat(member.getEmail()).isEqualTo(findMember.getEmail());
        assertThat(member.getPassword()).isEqualTo(findMember.getPassword());

    }

    public void 중복_회원_예외(){
        // given
        Member member1 = new Member();
        member1.setName("spring");
        member1.setEmail("spring@test");
        member1.setPassword("spring");

        Member member2 = new Member();
        member2.setName("spring");
        member2.setEmail("spring@test");
        member2.setPassword("spring");

        // when
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> memberService.join(member2));

        assertThat(e.getMessage()).isEqualTo("Member already exists");

        // then
    }

    @Test
    void testFindMembers(){

    }

    @Test
    void testFindOne(){

    }
}
