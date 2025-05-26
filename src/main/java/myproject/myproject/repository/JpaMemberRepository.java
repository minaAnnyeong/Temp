/*
package myproject.myproject.repository;

import java.util.List;
import java.util.Optional;

import myproject.myproject.domain.Member;
import jakarta.persistence.EntityManager;


public abstract class JpaMemberRepository implements MemberRepository{
    private EntityManager em;

    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findById(long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = em.createQuery(
                "select m " +
                        "from Member m " +
                        "where m.name = :name",
                Member.class)
                .setParameter("name", name)
                .getResultList();

        return result.stream().findAny();

    }

    @Override
    public Optional<Member> findByEmail(String email) {
        List<Member> result = em.createQuery(
                        "select m " +
                                "from Member m " +
                                "where m.email = :email",
                        Member.class)
                .setParameter("email", email)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        List<Member> result = em.createQuery(
                        "select m " +
                                "from Member m",
                        Member.class)
                .getResultList();
        return result;
    }
}
*/
