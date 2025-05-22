"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { name: "홈", href: "/" },
    { name: "유형 도감", href: "/personality-types" },
    { name: "NFT 갤러리", href: "/nft-gallery" },
    { name: "기업용", href: "/enterprise" },
    { name: "뉴스레터", href: "/newsletter" },
  ];
  
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
              W
            </div>
            <span className="font-bold text-xl text-gray-900">Web3 MBTI</span>
          </Link>
          
          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* 테스트 시작 버튼 */}
          <Link href="/" className="hidden md:flex">
            <Button variant="default" className="px-4">
              테스트 시작하기
            </Button>
          </Link>
          
          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/"
                className="bg-blue-600 text-white px-3 py-2 text-sm font-medium rounded-md text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                테스트 시작하기
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 