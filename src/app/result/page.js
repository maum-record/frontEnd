"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage({
  longSummary = `오늘은 아침 일찍 일어나 출근 준비를 했어요. 버스가 평소보다 붐벼서 약간 지치긴 했지만, 출근길에 들은 팟캐스트 덕분에 마음이 조금은 편안해졌습니다. 회사에서는 업무량이 많아서 정신없이 하루를 보냈고, 팀 회의 중에는 내가 준비했던 발표가 생각보다 반응이 좋지 않아서 살짝 속상했어요. 점심은 간단히 편의점에서 해결했는데, 급하게 먹어서 그런지 속이 불편했네요.

오후엔 메일과 업무 처리에 시달리다 보니 시간이 훌쩍 흘렀고, 퇴근 무렵에는 비까지 내려 우산 없이 젖은 채로 집에 도착했어요. 그래도 집에 돌아와서 따뜻한 물로 샤워를 하고, 조용한 음악을 틀어놓고 일기를 쓰며 하루를 마무리하니 마음이 조금은 가라앉는 느낌입니다. 오늘은 전반적으로 힘든 하루였지만, 내일은 좀 더 나은 하루가 되길 바라는 마음이에요.`,
  shortSummary = "오늘은 지치고 속상한 일이 많았던 하루였어요. 스스로를 잘 돌보는 시간이 필요해 보여요.",
  emotion = "😔 우울",
  positive = 34,
  negative = 66,
}) {
  const router = useRouter();
  const [nickname] = useState("마음이");

  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showFullResult, setShowFullResult] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태 관리

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < longSummary.length) {
        setDisplayedText((prev) => prev + longSummary[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowFullResult(true), 3000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [charIndex, longSummary]);

  return (
    <div className="relative min-h-screen">
      {/* 🔲 타이핑 중 검정 배경 */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-1000 ${
          showFullResult ? "opacity-0 pointer-events-none" : "opacity-100"
        } bg-black z-10`}
      >
        <p className="text-white text-lg sm:text-xl md:text-2xl leading-loose max-w-3xl whitespace-pre-wrap">
          {displayedText}
        </p>
      </div>

      {/* ✅ 결과 카드 */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex flex-col items-center justify-center px-4 py-10 transition-opacity duration-1000 ${
          showFullResult ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* ☰ 메뉴 */}
        <button
          onClick={() => setMenuOpen(!menuOpen)} // 메뉴 상태를 반전시킴
          className="absolute top-4 left-4 p-2 z-20"
          aria-label="메뉴"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-gray-800" />
            <div className="w-6 h-0.5 bg-gray-800" />
            <div className="w-6 h-0.5 bg-gray-800" />
          </div>
        </button>

        {/* 햄버거 메뉴 */}
        {menuOpen && (
          <div className="absolute top-16 left-4 bg-white border rounded-md shadow-lg w-48 p-4 z-40 space-y-2">
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

        {/* 📋 요약 카드 */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-3">{nickname} 님의 하루 요약</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">{shortSummary}</p>

          {/* 😊 감정 지수 */}
          <div className="flex justify-around text-sm text-gray-700 mb-2">
            <div>감정: <span className="font-semibold">{emotion}</span></div>
            <div>긍정 지수: <span className="font-semibold">{positive}%</span></div>
            <div>부정 지수: <span className="font-semibold">{negative}%</span></div>
          </div>

          {/* 📅 이동 */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/calendar")}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              캘린더로 이동
            </button>
          </div>
        </div>

        {/* 하단 로고 */}
        <div className="absolute bottom-4 text-gray-400 text-sm opacity-60 z-10">
          MaumRecord
        </div>
      </div>
    </div>
  );
}
