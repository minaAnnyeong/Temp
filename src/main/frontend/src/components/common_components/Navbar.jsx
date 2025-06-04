import '../../css/navbar_style.css';

import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    // let interval;
    const intervalRef = useRef(null);
    const [authenticated, setAuthenticated] = useState({
        username:'',
        time: '00:00',
        loggedIn : false
    });
    const [sessionExpired, setSessionExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoginSessionInfo();
        const interval = setInterval(fetchLoginSessionInfo, 1000);
        return () => clearInterval(intervalRef.current); // clean

    }, []);

    const fetchLoginSessionInfo = async () => {
        try {
            const res = await axios.get("/api/session-info", { withCredentials: true });

            if (res.data.loggedIn) {
                const { loggedIn, username, minutes, seconds } = res.data;
                setAuthenticated({
                    username: username,
                    // minutes , seconds => time 하나로 포맷팅
                    time: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
                    loggedIn: loggedIn
                });

                if (!sessionExpired) {
                    setSessionExpired(true);
                    clearInterval(intervalRef.current); // interval 중지
                    // alert 창 띄운 뒤 로그아웃 및 홈으로 리디렉트
                    alert("자동 로그아웃 되었습니다. 다시 로그인 해 주세요.");
                    await axios.post("/api/logout", {}, { withCredentials: true });
                    navigate("/");

                    res.data.loggedIn = false;
                }

            }
        } catch (err) {
            console.error("Session check failed:", err);
            setAuthenticated({ username: '', time: '00:00', loggedIn: false });
        }
    };

    const handleLogout = () => {
        axios.post("/api/logout", {withCredentials: true})
            .then(res => {
                window.location.href = "/"; // 로그아웃 시 홈 으로 로드
            });
    };

    if (sessionExpired) return null; // 리디랙션 동안 아무 행동도 취하지 x

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo">F.A.M</Link>
                <ul className="nav-links">
                    <li className="dropdown">
                        <a href="#">소개</a>
                        <ul className="dropdown-menu">
                            <li><a href="#">공지사항</a></li>
                            <li><a href="#">게시판</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a href="#">재무관리</a>
                        <ul className="dropdown-menu">
                            <li><a href="#">서비스소개</a></li>
                            <li><a href="#">금융자산추천</a></li>
                            <li><a href="#">미래가치<br/>시뮬레이션</a></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a href="#">가계부</a>
                        <ul className="dropdown-menu">
                            <li><a href="#">월간보고서</a></li>
                            <li><a href="#">목표챌린지</a></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a href="#">투자</a>
                        <ul className="dropdown-menu">
                            <li><a href="#">포트폴리오</a></li>
                            <li><a href="#">시장 분석</a></li>
                            <li><a href="#">연금상품</a></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a href="#">마이페이지</a>
                        <ul className="dropdown-menu">
                            <li><a href="#">프로필</a></li>
                            <li><a href="#">내 자산 조회</a></li>
                            <li><a href="#">내 자산 등록</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="user-log">
                    {authenticated.loggedIn ? (
                        <>
                            <span>{authenticated.username} 님 | </span>
                            <span> {authenticated.time} | </span>
                            <a href="#" onClick={handleLogout}>로그아웃</a>
                        </>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
