import React from 'react';
import {Link} from "react-router-dom";
import style from '../../css/side_navbar_style.module.css';

const SNavMyPage = () => {
    return (
        <div className={style.layoutContainer}>
            <nav className={style.navbarSide}>
                <ul>
                    <li className={style.navTitle}>
                        <Link to="/mypage">마이페이지</Link>
                    </li>
                    <div className={style.navLinks}>
                        <li><a href="/mypageProfile">프로필</a></li>
                        <li><a href="#">내 자산 조회</a></li>
                        <li><a href="#">내 자산 등록</a></li>
                    </div>
                </ul>
            </nav>
        </div>


    );
};

export default SNavMyPage;