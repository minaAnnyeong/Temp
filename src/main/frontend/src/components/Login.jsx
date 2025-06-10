import { Link } from 'react-router-dom';
import axios from "axios";
// import {fullFormats as formData} from "ajv-formats/src/formats";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from './common_components/Navbar';
import Footer from './common_components/Footer';
import '../css/base.css'; // 바탕 스타일
import '../css/common_form_style.css'; // 폼 스타일
import '../css/login_style.css';
import '../css/effect_fadein.css'; // fade-in 효과



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    /*
            Spring Security 로 인해 /login 은
            자동으로 MembersDetailsService 의
            loadUserByUsername()메소드를 호출한다.
    */
    const handleSubmit = (e) => {
        e.preventDefault(); // 자동 리로딩 방지

        axios.post('/api/login',
            new URLSearchParams({
                username: formData.email,
                password: formData.password, // User: raw password 입력
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true // 세션
        })
            .then((response) => {
                alert("로그인 성공! 홈으로 돌아갑니다.");
                navigate("/");
            })
            .catch((error) => {
                alert("아이디 또는 비밀번호가 틀립니다. error: " + error.message);
            });
    };



    return (
        <>
            <Navbar />

            <div className="login-section animate-on-load">
                <form id="login-form" onSubmit={handleSubmit}>
                    <h2>로그인</h2>

                    {/* 아이디, 비밀번호 input Area  */}
                    <div className="input">
                        <div className="input-line">
                            <label htmlFor="email">아이디</label>
                            <input type="text"
                                   id="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   placeholder="아이디(이메일)."
                                   required />
                        </div>

                        <div className="input-line">
                            <label htmlFor="pswd">비밀번호</label>
                            <input type="password"
                                   id="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                                   placeholder="비밀번호"
                                   required />
                        </div>
                    </div>

                    {/* 로그인 button  */}
                    <button type="submit" className="btn-blu" id="loginBtn">로그인</button>

                    {/* 하단 links  */}
                    <div className="small-links">
                        <a href="#">아이디찾기</a> |
                        <a href="#">비밀번호찾기</a> |
                        <Link to="/signup">회원가입</Link>
                    </div>

                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
