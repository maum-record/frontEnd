"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function MeditationPage() {
  const [nickname, setNickname] = useState("마음이");
  const [showToast, setShowToast] = useState(false);
  const [videoSrc, setVideoSrc] = useState(""); // 랜덤 영상 상태 저장
  const audioRef = useRef(null);
  const bellAudioRef = useRef(null);
  const router = useRouter();
  const menuRef = useRef(null); // 메뉴 외부 클릭 시 닫기

  const videoSources = [
    "/video/1.mp4",
    "/video/2.mp4",
    "/video/3.mp4",
    "/video/4.mp4",
  ];

  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태 관리

  useEffect(() => {
    // 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false); // 메뉴 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // 초기 및 2분마다 랜덤 영상 설정
    const changeVideo = () => {
      const next = videoSources[Math.floor(Math.random() * videoSources.length)];
      setVideoSrc(next);
    };

    changeVideo();
    const videoInterval = setInterval(changeVideo, 120000); // 2분마다 변경

    // 종소리 재생
    bellAudioRef.current?.play();
    const bellInterval = setInterval(() => {
      bellAudioRef.current?.play();
    }, 30000); // 30초마다

    // 6초 후 TTS
    const ttsTimer = setTimeout(() => {
      audioRef.current?.play();
    }, 6000);

    // 10초 후 토스트 알림
    const toastTimer = setTimeout(() => {
      setShowToast(true);
    }, 10000);

    return () => {
      clearInterval(videoInterval);
      clearInterval(bellInterval);
      clearTimeout(ttsTimer);
      clearTimeout(toastTimer);
    };
  }, []);

  const handleConfirm = () => {
    router.push("/result");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-10">
      {/* 🎥 자연 배경 영상 (2분마다 교체) */}
      <video
        key={videoSrc}
        src={videoSrc}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* ☰ 햄버거 메뉴 */}
      <button
        className="absolute top-4 left-4 p-2 z-20"
        onClick={() => setMenuOpen(!menuOpen)} // 메뉴 토글
        aria-label="메뉴 열기"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-200" />
          <div className="w-6 h-0.5 bg-gray-200" />
          <div className="w-6 h-0.5 bg-gray-200" />
        </div>
      </button>

      {/* ☰ 메뉴 (메뉴 열기, 닫기) */}
      {menuOpen && (
        <div ref={menuRef} className="absolute top-16 left-4 bg-white border rounded-md shadow-lg w-48 p-4 z-50 space-y-2">
          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left text-gray-800 hover:text-blue-600 font-semibold"
          >
            회원정보 수정
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full text-left text-gray-800 hover:text-red-500 font-semibold"
          >
            로그아웃
          </button>
        </div>
      )}

      {/* 👤 프로필 */}
      <img
        src="/profile-default.png"
        alt="프로필 사진"
        className="absolute top-4 right-4 w-12 h-12 rounded-full border border-gray-400 object-cover bg-white z-20"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/profile-default.png";
        }}
      />

      {/* 인사 메시지 */}
      <h1 className="absolute top-1/3 text-xl sm:text-2xl md:text-3xl text-white font-semibold text-center z-20">
        {nickname} 님, <br />
        마음을 편안하게 가라앉히세요. 🧘‍♀️
      </h1>

      {/* 출처 */}
      <div className="absolute top-2/3 text-xs text-center text-gray-500 z-20">
        이 콘텐츠는 VOLI의 AI보이스를 활용하여 제작되었습니다. <br />
        https://voli.ai
      </div>

      {/* 하단 로고 */}
      <div className="absolute bottom-4 text-gray-400 text-sm opacity-60 z-20">
        MaumRecord
      </div>

      {/* 🔊 오디오 */}
      <audio ref={bellAudioRef} src="/music/bell.mp3" />
      <audio ref={audioRef} src="/audio/VOLI_TTS_설아.wav" />

      {/* ✅ 토스트 알림 */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-xl shadow-md px-7 py-6 w-96 animate-toast">
          <h2 className="text-lg font-semibold text-gray-800">
            AI 분석이 완료되었어요!
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            프로그램을 마치고 결과를 확인하시겠어요?
          </p>
          <button
            onClick={handleConfirm}
            className="mt-4 text-sm bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            결과 보러 가기
          </button>
        </div>
      )}

      {/* ✨ 애니메이션 정의 */}
      <style jsx>{`
        @keyframes toast {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-toast {
          animation: toast 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
