import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

/*
    사용자 로그인 정보와
    로그인 / 로그아웃 Link
*/

const LoginSessionDataDisplay = () => {

    const [authenticated, setAuthenticated] = useState({
        username: '',
        loggedIn: false,
    });


    useEffect(() => {
        axios.get('/api/session-info', {withCredentials: true})
            .then(res => { // res: JSON 형태 반환값
                // check
                console.log("로그인 유저데이터: ",res.data);
                console.log("로그인 유저네임: ",res.data.username);
                console.log("로그인 T/F: ",res.data.loggedIn);

                if(res.data.loggedIn) {
                    setAuthenticated({
                        username: res.data.username,
                        loggedIn: res.data.loggedIn,
                    });
                } else {
                    setAuthenticated({
                        username: '',
                        loggedIn: res.data.loggedIn,
                    });
                }
            })
            .catch(err => {
                console.log("Session check error: ", err);
            });
    }, []);

    return (
        <div className="login-session-data">
            {authenticated.loggedIn ? (
                <>
                    <span>안녕하세요 {authenticated.username} 님 | </span>
                    <a href="#" onClick={() => {
                    axios.post("/api/logout", {}, {withCredentials: true})
                        .then(res => {
                            console.log("로그아웃..");
                            window.location.href = "/";
                        });
                    }}>로그아웃</a>
                </>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </div>
    );
};

export default LoginSessionDataDisplay;