"use client";

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function EnterprisePage() {
  // 미리보기용 월 리스트
  const months = [
    '2025-05', '2025-04', '2025-03', '2025-02', '2025-01',
    '2024-12', '2024-11', '2024-10', '2024-09', '2024-08',
  ];
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">Know Your Users</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 text-center">
          기업 고객을 위한 맞춤형 유저 분석 리포트를 제공합니다.
          데이터 기반 인사이트로 고객 이해도를 높이고, 비즈니스 전략을 강화하세요.
        </p>

        {/* 보고서 월 선택 */}
        <div className="max-w-xs mx-auto mb-8">
          <label htmlFor="month" className="block text-sm font-medium mb-2 text-gray-700">보고서 월 선택</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* 인사이트 미리보기 */}
        <section className="mb-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedMonth} 인사이트 요약 미리보기</h2>
          {/* 예시 차트 영역 */}
          <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-6">
            <span className="text-gray-500">차트 미리보기</span>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>기본 유형 비율: 30% | 확장 유형 비율: 70%</li>
            <li>Airdrop Hunter 활동량 +15% 증가</li>
            <li>Solidity Sage 채용 문의 5건 수신</li>
            <li>최다 방문 커뮤니티: Discord Testnet Hunters</li>
          </ul>
        </section>

        {/* 가격 안내 */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">한 달치 인사이트 패키지</h2>
          <p className="text-3xl font-extrabold mb-4">$100<span className="text-base font-medium"> /회</span></p>
          <p className="text-gray-700 mb-6">선택하신 {selectedMonth} 월 인사이트 보고서를 즉시 확인할 수 있습니다.</p>
        </section>

        <div className="text-center">
          <Button className="px-8 py-4 text-lg">{selectedMonth} 인사이트 구매하기 ($100)</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
} 