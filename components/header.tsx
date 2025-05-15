"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

// Logo SVG as a separate component
function LogoSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="32"
      height="32"
      aria-hidden="true"
    >
      {/* First large droplet */}
      <path
        d="M40 15 C 50 35, 70 50, 70 70 A 25 25 0 1 1 20 60 C 20 40, 30 35, 40 15"
        fill="#2563eb"
      />
      {/* Second small droplet */}
      <path
        d="M65 30 C 70 40, 80 50, 80 65 A 15 15 0 1 1 50 65 C 50 50, 60 40, 65 30"
        fill="#3b82f6"
      />
      {/* Highlight */}
      <circle cx="35" cy="40" r="5" fill="#ffffff" fillOpacity="0.6" />
    </svg>
  );
}

// Navigation link item type
type NavLinkProps = {
  href: string;
  label: string;
};

// Navigation link component
function NavLink({ href, label }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      {label}
    </a>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { name: "홈", href: "/" },
    { name: "유형 도감", href: "/personality-types" },
    { name: "NFT 갤러리", href: "/nft-gallery" },
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