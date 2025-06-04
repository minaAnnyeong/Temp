import React, { useEffect, useRef, useState, useCallback } from 'react';

import '../css/base.css';
import '../css/home_style.css';
import '../css/common_button_style.css'; // 버튼 스타일
import '../css/effect_fadein.css'; // fade-in 효과

import Navbar from './common_components/Navbar';
import Footer from './common_components/Footer';
import { useNavigate } from 'react-router-dom';

const bannerImages = [
    '../assets/images/home_banner/img_1.png',
    '../assets/images/home_banner/img_2.png',
    '../assets/images/home_banner/img_3.png',
    '../assets/images/home_banner/img_4.png',
    '../assets/images/home_banner/img_5.png'
];

const Home = () => {
    const navigate = useNavigate();
    const bannerTrackRef = useRef(null);
    const imageRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageGap = 20;

    const updateBannerPosition = useCallback(() => {
        const bannerTrack = bannerTrackRef.current;
        const imageWidth = imageRefs.current[0]?.offsetWidth || 0;
        const moveX = (imageWidth + imageGap) * currentIndex;
        if (bannerTrack) {
            bannerTrack.style.transform = `translateX(-${moveX}px)`;
        }
    }, [currentIndex]);

    useEffect(() => {
        updateBannerPosition();
    }, [updateBannerPosition]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Navbar />

            <section className="main-area">
                <div className="left-content">
                    <h1 className="animate-on-load" style={{ animationDelay: '0.2s' }}>
                        Manage Your Assets Smarter
                    </h1>
                    <p className="animate-on-load" style={{ animationDelay: '0.4s' }}>
                        재정적 미래를 쉽게 추적하고, 성장시키며, 안전하게 보호하세요.
                    </p>
                    <div className="button-wrapper">
                        <button
                            className="btn-wht animate-on-load"
                            style={{ animationDelay: '0.8s' }}
                            onClick={() => navigate('/signup')}
                        >
                            회원가입
                        </button>
                        <button
                            className="btn-ppl animate-on-load"
                            style={{ animationDelay: '1.0s' }}
                            onClick={() => navigate('/login')}
                        >
                            로그인
                        </button>
                    </div>
                </div>

                <div className="right-banner">
                    <div className="banner-frame">
                        <button
                            className="arrow left-arrow"
                            onClick={() =>
                                setCurrentIndex((prev) =>
                                    (prev - 1 + bannerImages.length) % bannerImages.length
                                )
                            }
                        >
                            &#10096;
                        </button>
                        <div className="banner-track-container">
                            <div className="banner-track" ref={bannerTrackRef}>
                                {bannerImages.map((src, idx) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        alt={`Banner${idx + 1}`}
                                        ref={(el) => (imageRefs.current[idx] = el)}
                                        style={{ width: "560px", height: "310px", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className="arrow right-arrow"
                            onClick={() =>
                                setCurrentIndex((prev) => (prev + 1) % bannerImages.length)
                            }
                        >
                            &#10097;
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
