import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AiDrop - 온체인 아이덴티티 분석 및 NFT 발행",
  description: "AI 기반 온체인 데이터 분석으로 맞춤형 에어드랍과 사용자 성격 유형 NFT를 제공합니다.",
  creator: "AiDrop Team",
  keywords: ["블록체인", "온체인 분석", "에어드랍", "NFT", "이더리움", "AI", "데이터 분석"],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
