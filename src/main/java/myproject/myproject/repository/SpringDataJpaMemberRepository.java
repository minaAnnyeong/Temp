package myproject.myproject.repository;

import myproject.myproject.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataJpaMemberRepository
        extends JpaRepository<Member, Long>,
        MemberRepository {

    @Override
    Optional<Member> findByName(String name);

    @Override
    Optional<Member> findByEmail(String email);

//    @Override
//    void delete(Member entity);
}
