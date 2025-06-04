package myproject.myproject.domain;

import jakarta.persistence.*;
import lombok.*;

// Member VO
// JPA의 관리를 받는 객체. 테이블과 링크된 클래스
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Member {

    // 사용자가 적는 id 아닌 시스템에 저장되는 id
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) // ID
    @Column(name= "member_id")
    private Long id;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_email")
    private String email;

    @Column(name = "password", length = 100)
    private String password;



}
