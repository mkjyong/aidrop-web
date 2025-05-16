"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function SubscribePage() {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // TODO: 구독 로직 구현 (결제 또는 이메일 저장 등)
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError('구독 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center">기업용 리포트 구독 신청</h1>
        {success ? (
          <p className="text-green-600 text-center">구독 신청이 완료되었습니다! 곧 연락드리겠습니다.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <label className="block mb-2 font-medium">회사명</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="회사명"
            />
            <label className="block mb-2 font-medium">담당자 이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button type="submit" className="w-full">구독 신청</Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
} 