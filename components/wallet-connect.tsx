"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink } from "lucide-react";

interface WalletConnectProps {
  onConnect: (connected: boolean) => void;
  className?: string;
}

export function WalletConnect({ onConnect, className = "" }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // 실제 구현에서는 여기에 지갑 연결 로직을 추가합니다.
      // 예시: MetaMask, WalletConnect 등을 사용한 연결 처리
      
      // 연결 성공을 가정한 데모 지연
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 부모 컴포넌트에 연결 상태 전달
      onConnect(true);
    } catch (err) {
      console.error("지갑 연결 오류:", err);
      setError("지갑 연결에 실패했습니다. 다시 시도해주세요.");
      onConnect(false);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className={`${className}`}>
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full flex items-center justify-center"
      >
        {isConnecting ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            연결 중...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            지갑 연결하기
          </>
        )}
      </Button>
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>지갑이 없으신가요?</p>
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 flex items-center mt-1 hover:underline"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          MetaMask 설치하기
        </a>
      </div>
    </div>
  );
} 