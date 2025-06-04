/*
import '../css/base.css';
import '../css/effect-fadein.css';
*/

import React, { useState, useEffect } from 'react';

const AgreementCheck = ({ onValidChange }) => {
    const terms = [
        { id: 0, title: '서비스 이용 약관 동의 [필수]', required: true },
        { id: 1, title: '개인정보 수집 및 이용 동의 [필수]', required: true },
        { id: 2, title: '광고성 마케팅 정보 수신 동의 [선택]', required: false },
    ];

    const [checkItems, setCheckItems] = useState([]);

    const allRequiredAgreed = terms
        .filter(term => term.required)
        .every(term => checkItems.includes(term.id));

    useEffect(() => {
        onValidChange(allRequiredAgreed);
    }, [checkItems, onValidChange]);

    const selectChecked = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
        } else {
            setCheckItems(prev => prev.filter(el => el !== id));
        }
    };

    const allChecked = (checked) => {
        if (checked) {
            setCheckItems(terms.map(term => term.id));
        } else {
            setCheckItems([]);
        }
    };

    return (
        <div className="agreement-check">
            <h2>이용 약관 동의</h2>

            <div className="chk-all">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        className="select-all"
                        onChange={(e) => allChecked(e.target.checked)}
                        checked={checkItems.length === terms.length}
                    />
                    <span>약관 내용에 대해 모두 숙지하고 전체 동의 합니다.</span>
                </label>
            </div>

            <div className="chk-list">
                <ul className="list">
                    {terms.map((term) => (
                        <li key={term.id} className={term.required ? "item" : "item-inner"}>
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    className={term.required ? "required-check" : "optional"}
                                    onChange={(e) => selectChecked(e.target.checked, term.id)}
                                    checked={checkItems.includes(term.id)}
                                />
                                <span className="txt">{term.title}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AgreementCheck;
