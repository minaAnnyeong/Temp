/*
import '../css/base.css';
import '../css/verification-style.css';
import '../css/effect-fadein.css';
*/

import React, { useState, useRef, useEffect } from 'react';

const Verification = ({ onValidChange }) => {
    /*
    * TEMP_CODE - 테스트용 임시 코드  : 123456
    * TIME_LIMIT - 인증 시간
    *  */
    const TEMP_CODE = '123456';
    const TIME_LIMIT = 30 * 1000;
    const INTERVAL = 1000;

    const [visible, setVisible] = useState(false);
    // const [userEmail, setUserEmail] = useState('');
    const [userCode, setUserCode] = useState('');

    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [codeMessage, setCodeMsg] = useState('');
    const [codeMsgColor, setCodeMsgColor] = useState('');

    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

    const timerRef = useRef(null);
    const timeString = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0') +
        " : " +
        String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    const clickSendCodeBtn = () => {
        /*
        const emailValue = userEmail.trim();
        if (emailValue === '') {
            setEmailErrMsg('이메일을 입력해주세요.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setEmailErrMsg('이메일을 올바르게 입력해주세요.');
            return;
        } */

        setTimeLeft(TIME_LIMIT);
        setEmailErrMsg('');
        setVisible(true);
        setUserCode('');
        setCodeMsg('');
        setCodeMsgColor('');
        onValidChange(false); // reset
    };

    useEffect(() => {
        if (timeLeft === TIME_LIMIT) {
            clearInterval(timerRef.current);
            setSubmitBtnDisabled(false);

            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= INTERVAL) {
                        clearInterval(timerRef.current);
                        setSubmitBtnDisabled(true);
                        setCodeMsg(<font>인증 시간 초과!<br />페이지를 새로고침 해주세요.</font>);
                        onValidChange(false);
                        return 0;
                    }
                    return prev - INTERVAL;
                });
            }, INTERVAL);

            return () => clearInterval(timerRef.current);
        }
    }, [visible]);

    const clickSubmitBtn = () => {
        if (userCode.trim() !== TEMP_CODE) {
            setCodeMsg('Wrong Code!');
            setCodeMsgColor('red');
            onValidChange(false);
        } else {
            setCodeMsg('Success!');
            setCodeMsgColor('green');
            clearInterval(timerRef.current);
            onValidChange(true);
        }
    };

    return (
        <div className="verification">
            <h2>본인 인증</h2>
            <div className="input-line">
                {/*<label htmlFor="userEmail">코드 발송 이메일</label>
                <input
                    type="email"
                    id="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="이메일을 입력해주세요"
                    required
                />*/}


            </div>

            <div className="input-message">{emailErrMsg}</div>
            <div className="send-code-section">
                <label htmlFor="sendCodeBtn"><small>※ 입력하신 이메일로 인증코드를 전송합니다.</small></label>
                <button type="button" className="btn-blu" id="sendCodeBtn" onClick={clickSendCodeBtn}>코드 전송</button>
            </div>

            {visible && (
                <div id="codeSection">
                    <div className="input-line">
                        <div>
                        <label htmlFor="submitCode">인증 코드 (숫자6자리)를 입력해주세요.</label>
                        </div>
                        {/*<label htmlFor="submitCode">인증 코드 입력</label>*/}
                        <input
                            type="text"
                            id="submitCode"
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            maxLength="6"
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </div>
                    <div className="input-message" style={{ color: codeMsgColor }}>{codeMessage}</div>
                    <div className="timer">{timeString}</div>
                    <button type="button" className="btn-blu" id="submitCodeBtn" onClick={clickSubmitBtn} disabled={submitBtnDisabled}>확인</button>
                </div>
            )}
        </div>
    );
};

export default Verification;
