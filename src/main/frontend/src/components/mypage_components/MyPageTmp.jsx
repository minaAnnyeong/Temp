import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../common_components/Navbar";
import Footer from "../common_components/Footer";
import '../../css/base.css';
import '../../css/common_form_style.css';

const MyPageTmp = () => {

    const [userInfo, setUserInfo] = useState({
        email: "",
        username: "",
    });
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('api/session-info', {withCredentials: true})
            .then((response) => {
                if (response.data.loggedIn) {
                    setUserInfo({
                        email: response.data.email,
                        username: response.data.username,
                    });
                } else {
                    alert("로그인 페이지로 이동합니다.");
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("정보 불러오기 오류");
                navigate("/login");
            });
    }, []);

    /*
        사용자 회원 정보 업데이트
    */
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

    /*
        사용자 회원 탈퇴
    */
    const handleDeleteUserInfo = (userInfo) => {
        if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;
        axios.delete('/api/mypage', {withCredentials: true})
            .then((response) => {
                alert("탈퇴되었습니다.");
                navigate("/");
            });
    };


    return (
        <div>

            <Navbar/>


            <form className="mypageProfileForm">
                <h2>My Page</h2>

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

            <Footer/>
        </div>
    );
};

export default MyPageTmp;