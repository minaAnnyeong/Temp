/*
import React from 'react';

import '../../css/base.css';
import style from '../../css/common_area_style.module.css';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../common_components/Navbar";
import SNavMyPage from "../side_nav_components/SNavMyPage";
import Footer from "../common_components/Footer";
import axios from "axios";

const Profile = () => {

    const navigate = useNavigate();

    /!*
       사용자 회원 정보 업데이트
   *!/
    const handleUpdateUserInfo = (userInfo) => {
        console.log(userInfo);
        axios.put('/api/mypage', {
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
        }, {withCredentials: true})
            .then((response) => {
                console.log(response);
                alert("정보가 업데이트 되었습니다.");
            })
            .catch((error) => {
                console.log(error);
                alert("업데이트 오류.");
            });
    };

    /!*
        사용자 회원 탈퇴
    *!/
    const handleDeleteUserInfo = (userInfo) => {
        if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;
        axios.delete('/api/mypage', {withCredentials: true})
            .then((response) => {
                alert("탈퇴되었습니다.");
                navigate("/");
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <div style={{ display: 'flex', flex: 1 }}>
                <SNavMyPage />

                <div className="main" style={{ flex: 1 }}>
                    <div className={style.rowContainer}>
                        <div className={style.common} id="myPageUserInfo">
                            <div className={style.title}>
                                <form className="mypageProfileForm">
                                    <h2>프로필</h2>

                                    <label>Email:</label>
                                    <input value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})}/><br/>

                                    <label>Username:</label>
                                    <input value={userInfo.username}
                                           onChange={e => setUserInfo({...userInfo, username: e.target.value})}/><br/>

                                    <label>New Password:</label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>

                                    <button onClick={handleUpdateUserInfo}>내 정보 수정</button>
                                    <button onClick={handleDeleteUserInfo}>회원탈퇴</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;*/
