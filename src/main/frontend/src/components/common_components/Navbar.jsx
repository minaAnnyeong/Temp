import '../../css/navbar_style.css';

import LoginSessionDataDisplay from './LoginSessionDataDisplay';

import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {

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

                {/*  */}
                <LoginSessionDataDisplay key={window.location.pathname} />

            </nav>
        </>
    );
};

export default Navbar;
