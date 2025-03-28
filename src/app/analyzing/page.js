"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalyzingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/healing");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-6 text-center">
        🧠 우리가 AI 분석을 기다리는 동안... <br />
      </h1>

      {/* 로딩 도트 */}
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
      </div>

      {/* 하단 로고 */}
      <div className="absolute bottom-4 text-gray-400 text-sm opacity-60">
        MaumRecord
      </div>
    </div>
  );
}
