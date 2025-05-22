"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function MintPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleConnect = () => {
    // TODO: Sui 지갑 연결 기능 구현
    setStatus('지갑 연결 기능이 준비 중입니다.');
  };

  const handleMint = () => {
    // TODO: Soulbound NFT 민팅 기능 구현
    setStatus('민팅 기능이 준비 중입니다.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Soulbound NFT 민팅</h1>
        <div className="flex flex-col items-center gap-4">
          <Button onClick={handleConnect} className="px-8 py-4">Sui 지갑 연결</Button>
          <Button onClick={handleMint} className="px-8 py-4">민팅하기</Button>
          {status && <p className="mt-4 text-gray-700">{status}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
} 