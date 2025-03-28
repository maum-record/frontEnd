"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // 오류 메시지 초기화

    try {
      const response = await fetch("http://localhost:8080//login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // JWT 저장

      if (email === "admin@maumrecord.com") {
        router.push("/admin"); // 관리자 페이지 이동
      } else {
        router.push("/record"); // 일반 사용자 페이지 이동
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">MaumRecord</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">이메일</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">비밀번호</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
