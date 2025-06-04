import Navbar from "./common_components/Navbar";
import Footer from "./common_components/Footer";

import SignupInput from './signup_modules/SignupInput';
import AgreementCheck from './signup_modules/AgreementCheck';
import Verification from './signup_modules/Verification';

import '../css/base.css';
import '../css/signup_style.css';
import '../css/effect_fadein.css';

import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirm: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isAgreementValid, setIsAgreementValid] = useState(false);
    const [isVerificationValid, setIsVerificationValid] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 리로딩 방지
        if (isFormValid && isAgreementValid && isVerificationValid) {
            axios.post('/api/members/new', formData)
                .then(res => {
                    alert(res.data.message);
                    navigate("/"); // Home 으로 redirect
                })
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.message) {
                        alert(err.response.data.message);
                    } else {
                        alert("서버 오류: Unknown server error");
                    }
                });
        }
    };

    return (
        <>
            <Navbar/>
            <div className='animate-on-load'>
                <form id="signup-form"  onSubmit={handleSubmit}>
                    <SignupInput
                        formData={formData}
                        setFormData={setFormData}
                        onValidChange={setIsFormValid}
                    />
                    <AgreementCheck onValidChange={setIsAgreementValid}/>
                    <Verification email={formData.email} onValidChange={setIsVerificationValid}/>
                    {/* 입력양식 && 약관동의 && 본인인증 -> 활성화 */}
                    <button type="submit" className="btn-blu"
                            disabled={!(isFormValid && isAgreementValid && isVerificationValid)}>
                        회원가입</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default Signup;
