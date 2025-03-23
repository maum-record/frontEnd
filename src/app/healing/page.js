"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HealingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickname, setNickname] = useState("마음이");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSelect = (type) => {
    console.log(`✅ 선택된 힐링 프로그램: ${type}`);
    router.push(`/healing/${type}`);  // 각 프로그램 페이지로 이동
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      {/* ☰ 햄버거 메뉴 버튼 */}
      <button
        className="absolute top-4 left-4 p-2"
        onClick={toggleMenu}
        aria-label="메뉴 열기"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
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

      {/* 🖼️ 프로필 이미지 (우상단 고정) */}
      <img
        src="/profile-default.png"
        alt="프로필 사진"
        className="absolute top-4 right-4 w-12 h-12 rounded-full border border-gray-400 object-cover bg-white"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/profile-default.png";
        }}
      />

      {/* 👋 인사 메시지 */}
      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6">
        {nickname} 님, <br />
        오늘도 힐링의 시간을 가져 볼까요?
      </h1>

      {/* 🌿 힐링 카드 선택 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div
          onClick={() => handleSelect("meditation")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🧘‍♀️</span>
          <h2 className="text-lg font-semibold text-gray-700">명상</h2>
        </div>

        <div
          onClick={() => handleSelect("yoga")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🧎</span>
          <h2 className="text-lg font-semibold text-gray-700">요가 스트레칭</h2>
        </div>

        <div
          onClick={() => handleSelect("music")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🎧</span>
          <h2 className="text-lg font-semibold text-gray-700">힐링 음악 감상</h2>
        </div>
      </div>

      {/* 분석 중 상태 */}
      <div className="mt-10 text-sm text-gray-500">🧠 AI 분석이 진행되고 있습니다...</div>

      {/* 하단 로고 */}
      <div className="absolute bottom-4 text-gray-400 text-sm opacity-60">
        MaumRecord
      </div>
    </div>
  );
}
