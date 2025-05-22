"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function NFTGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">NFT 갤러리</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              민팅된 웹3 성격유형 NFT들의 컬렉션을 확인하세요.
            </p>
          </div>

          {/* 커밍순 콘텐츠 */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Coming Soon!</h2>
              <p className="text-xl text-gray-700 mb-8">
                NFT 갤러리가 곧 오픈됩니다!
              </p>
              <p className="text-gray-600 mb-6">
                현재 준비 중인 웹3 성격유형 NFT 갤러리는 곧 여러분을 찾아갑니다.
                <br />
                더 나은 서비스로 찾아뵙겠습니다.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>준비 중</span>
              </div>
            </div>
            
            {/* 테스트 관련 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                <span>성격유형 테스트 하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              
              <Link 
                href="/personality-types" 
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                <span>성격유형 도감 보기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 