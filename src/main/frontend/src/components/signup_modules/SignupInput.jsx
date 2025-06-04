import {useState, useEffect} from 'react';

const SignupInput = ({onValidChange, formData, setFormData}) => {
    const [errors, setErrors] = useState({email: '', passwordConfirm: ''});

    useEffect(() => {
        const validate = () => {
            const newErrors = {email: '', passwordConfirm: ''};
            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = '이메일: 유효한 형식으로 입력해주세요.';
                isValid = false;
            }

            if (formData.password !== formData.passwordConfirm) {
                newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
                isValid = false;
            }

            setErrors(newErrors);
            onValidChange(isValid);
        };
        validate();
    }, [formData, onValidChange]);

    return (
        <div className="signup-input">
            <h2>회원 정보 입력</h2>
            <div className="input-line-signup">
                <label htmlFor="email">아이디</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={errors.email ? "input-error" : ""}
                    placeholder="이메일"
                    required
                    autoFocus
                />
                {/*{errors.email && <small className="error-text">{errors.email}</small>}*/}
            </div>
            {errors.email && <small className="error-text">{errors.email}</small>}

            <div className="input-line-signup">
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="이름"
                    required
                />
            </div>

            <div className="input-line-signup">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="비밀번호"
                    required
                />
            </div>

            <div className="input-line-signup">
                <label htmlFor="passwordConfirm"></label>
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                    className={errors.passwordConfirm ? "input-error" : ""}
                    placeholder="비밀번호 확인"
                    required
                />

            </div>
            {errors.passwordConfirm && <small className="error-text">{errors.passwordConfirm}</small>}

        </div>
    );
};

export default SignupInput;
