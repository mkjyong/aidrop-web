"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-4 bg-white/90 backdrop-blur-sm border-b border-blue-100 fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="32"
              height="32"
            >
              {/* 첫 번째 큰 물방울 */}
              <path
                d="M40 15 C 50 35, 70 50, 70 70 A 25 25 0 1 1 20 60 C 20 40, 30 35, 40 15"
                fill="#2563eb"
              />
              {/* 두 번째 작은 물방울 */}
              <path
                d="M65 30 C 70 40, 80 50, 80 65 A 15 15 0 1 1 50 65 C 50 50, 60 40, 65 30"
                fill="#3b82f6"
              />
              {/* 하이라이트 */}
              <circle cx="35" cy="40" r="5" fill="#ffffff" fillOpacity="0.6" />
            </svg>
            <span className="font-bold text-xl">AiDrop</span>
          </Link>
          
          <nav className="flex gap-6">
            <a href="#top" className="text-gray-600 hover:text-blue-600 transition-colors">홈</a>
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">특징</a>
            <a href="#process" className="text-gray-600 hover:text-blue-600 transition-colors">프로세스</a>
          </nav>
        </div>
      </div>
    </header>
  );
} 