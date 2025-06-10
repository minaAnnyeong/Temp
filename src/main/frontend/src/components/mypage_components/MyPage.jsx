import React, {useEffect, useState} from 'react';
import Navbar from "../common_components/Navbar";
import Footer from "../common_components/Footer";
import SNavMyPage from "../side_nav_components/SNavMyPage";
import '../../css/base.css';
import style from '../../css/common_area_style.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const MyPage = () => {

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <div style={{ display: 'flex', flex: 1 }}>
                <SNavMyPage />

                <div className="main" style={{ flex: 1 }}>
                    <div className={style.rowContainer}>
                        <div className={style.common} id="myPageUserInfo">
                            <div className={style.title}>
                                <h4>반갑습니다.</h4>
                                <h3>{userInfo.username} 님</h3>
                            </div>
                            <hr />
                            <div className={style.content}>
                                <ul>
                                    <li>
                                        이용 중인 서비스
                                        <ul>
                                            <li>- #service1</li>
                                            <li>- #service2</li>
                                            <li>- #service3</li>
                                        </ul>
                                    </li>
                                    <li>
                                        등록된 내 자산
                                        <ul>
                                            <li>- #myasset1</li>
                                            <li>- #myasset2</li>
                                            <li>- #myasset3</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={style.common} id="myPageBanner">
                            <div className={style.title}>
                                <h3>{userInfo.username}님이 관심 가지실 만한 상품</h3>
                            </div>
                            <hr />
                            <div className={style.content}>
                                <img src="#" alt="banner1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default MyPage;