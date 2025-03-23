"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickname, setNickname] = useState("마음이");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    "/music/1.mp3",
    "/music/2.mp3",
    "/music/3.mp3",
    "/music/4.mp3",
    "/music/5.mp3",
    "/music/6.mp3",
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const playRandomTrack = () => {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(randomTrack);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!currentTrack) {
        playRandomTrack();
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackEnd = () => {
    playRandomTrack();
    audioRef.current.play();
  };

  const handleConfirm = () => {
    router.push("/result");
  };

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.load();
      audioRef.current.play();
    }

    const toastTimer = setTimeout(() => {
      setShowToast(true);
    }, 10000); // 10초 후 토스트 알림 표시

    return () => clearTimeout(toastTimer);
  }, [currentTrack]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center px-4 py-10">
      {/* ☰ 햄버거 메뉴 */}
      <button
        className="absolute top-4 left-4 p-2"
        onClick={toggleMenu}
        aria-label="메뉴 열기"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-700"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
        </div>
      </button>

      {/* 메뉴 열림 시 */}
      {menuOpen && (
        <div className="absolute top-16 left-4 bg-white border shadow-lg rounded-md w-48 p-4 space-y-2 z-10">
          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left text-gray-800 hover:text-blue-600 font-semibold"
          >
            회원정보 수정
          </button>
          <button className="w-full text-left text-gray-800 hover:text-red-500 font-semibold">
            로그아웃
          </button>
        </div>
      )}

      {/* 프로필 이미지 */}
      <img
        src="/profile-default.png"
        alt="프로필 사진"
        className="absolute top-4 right-4 w-12 h-12 rounded-full border border-gray-400 object-cover bg-white"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/profile-default.png";
        }}
      />

      {/* 인사 메시지 */}
      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6 animate-sway">
        {nickname} 님, <br />
        평화로운 피아노 음악과 함께 마음의 힐링을 느껴 보세요. 🎶
      </h1>

      {/* 재생/일시정지 버튼 */}
      <div className="flex justify-center mb-6">
        <button
          onClick={togglePlay}
          className="text-white text-3xl transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* 오디오 */}
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        controls={false}
      />

      {/* 하단 로고 */}
      <div className="absolute bottom-4 text-gray-400 text-sm opacity-60">
        MaumRecord
      </div>

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

      {/* 🎨 스타일 */}
      <style jsx>{`
        @keyframes sway {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-sway {
          display: inline-block;
          animation: sway 3s ease-in-out infinite;
        }

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
