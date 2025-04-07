"use client";

import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chain, getChainById, getExplorerAddressUrl } from "@/lib/chains";
import { useMemo } from "react";

interface SuccessMessageProps {
  chainId: number;
  address: string;
}

export function SuccessMessage({ chainId, address }: SuccessMessageProps) {
  // 체인 정보를 메모이제이션하여 불필요한 재계산 방지
  const chain: Chain | undefined = useMemo(() => getChainById(chainId), [chainId]);
  
  // 주소 포맷팅 함수 (재사용성)
  const formatAddress = (address: string): string => {
    if (!address || address.length < 8) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // 익스플로러에서 보기 기능
  const handleViewInExplorer = () => {
    if (!chain || !address) return;
    
    try {
      const url = getExplorerAddressUrl(chain, address);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("익스플로러 URL을 열 수 없습니다:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">
          분석이 시작되었습니다!
        </h3>
        <div className="flex flex-col items-center gap-1">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-blue-700 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {chain?.name || "알 수 없는 체인"}
          </div>
          <p className="text-gray-600 text-lg">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-600">
              {formatAddress(address)}
            </span>
            에 대한 온체인 성격 분석이 진행 중입니다
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 w-full">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">다음 단계는?</h4>
          <p className="text-gray-600 text-sm">
            분석이 완료되면 약 2주 후에 입력하신 지갑 주소로 당신만의 온체인 성격 유형 NFT를 발행해 드립니다. 
            (상황에 따라 더 오래 걸릴 수 있습니다)
          </p>
          <div className="inline-flex flex-wrap gap-3 pt-1">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white border-blue-200 hover:bg-blue-50 text-blue-600"
              onClick={handleViewInExplorer}
              disabled={!chain || !address}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              익스플로러에서 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 