package myproject.myproject.service;


import myproject.myproject.domain.Member;
import myproject.myproject.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

//@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository) {

        this.memberRepository = memberRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // 회원가입 : 암호화 insert
    public Member registerMember(Member member) {
        validateDuplicateMember(member);

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        return memberRepository.save(member);
    }

    // 회원가입 : 비 암호화 insert
//    public Long join(Member member) {
//        validateDuplicateMember(member);
//
//        memberRepository.save(member);
//        return member.getId();
//    }

    // 중복 검사 - findByEmail
    private void validateDuplicateMember(Member member) {
        memberRepository.findByEmail(member.getEmail())
                .ifPresent(m -> {
                    throw new IllegalStateException("Duplicate member email: " + member.getEmail());
                });

    }

    // 전체 회원 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    // 개별 회원 조회 - by id
    public Optional<Member> findOne(Long memberId){
        return memberRepository.findById(memberId);
    }

    // 개별 회원 조회 - by email
    public Optional<Member> findByEmail(String email) { return this.memberRepository.findByEmail(email); }
}
