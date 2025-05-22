"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('구독 등록 실패');
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center">뉴스레터 구독</h1>
        {success ? (
          <p className="text-green-600 text-center">구독이 완료되었습니다! 이메일을 확인해주세요.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <label htmlFor="email" className="block mb-2 font-medium">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button type="submit" className="w-full">구독하기</Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
} 