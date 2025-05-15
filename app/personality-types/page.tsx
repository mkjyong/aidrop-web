"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { personalityTypes as advancedTypes } from "@/lib/personality-types";
import { personalityTypes as simpleTypes } from "@/lib/personality-types-simple";
import Link from "next/link";

export default function PersonalityTypesPage() {
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 현재 탭에 따라 표시할 유형 결정
  const typesToShow = activeTab === "simple" ? simpleTypes : advancedTypes;
  
  // 검색어에 따라 필터링
  const filteredTypes = searchTerm 
    ? typesToShow.filter(type => 
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : typesToShow;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">웹3 성격유형 도감</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              웹3 세계의 다양한 성격유형들을 탐색해보세요. 
              각 유형별 특징과 성향을 확인하고 어떤 유형이 당신과 가장 잘 맞는지 알아보세요.
            </p>
          </div>

          {/* 검색창 */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="유형 검색..."
                className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
          
          {/* 탭 선택 */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("simple")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === "simple" 
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              기본 유형 (10개)
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === "advanced"
                  ? "bg-purple-100 text-purple-700 border-2 border-purple-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              확장 유형 (22개)
            </button>
          </div>

          {/* 유형 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTypes.map((type) => (
              <div 
                key={type.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{type.emoji}</div>
                    <h3 className="text-xl font-bold">{type.name}</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {type.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {type.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/#type-${type.id}`}
                    className="inline-block text-blue-600 font-medium hover:underline"
                  >
                    테스트로 확인하기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTypes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            </div>
          )}
          
          {/* 테스트 링크 */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">어떤 유형인지 알아보고 싶으신가요?</h2>
            <p className="text-gray-700 mb-6">
              성격 테스트를 통해 당신의 웹3 성격 유형을 알아보세요!
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
            >
              <span>테스트 시작하기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 