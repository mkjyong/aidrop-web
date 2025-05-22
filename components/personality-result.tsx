"use client";

import { PersonalityType } from "@/lib/personality-types";
import { Button } from "@/components/ui/button";
import { Copy, Twitter, Send } from "lucide-react";
import { useRef, useEffect } from "react";
import html2canvas from "html2canvas";

interface PersonalityResultProps {
  result: PersonalityType;
  secondaryType?: PersonalityType | null; // 부 유형
  secondaryTypePercent?: number; // 부 유형 백분율
  onRestart: () => void;
}

export function PersonalityResult({
  result,
  secondaryType,
  secondaryTypePercent,
  onRestart
}: PersonalityResultProps) {
  const resultCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 결과가 표시되면 스크롤을 결과로 이동
    if (resultCardRef.current) {
      resultCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`나의 웹3 성격유형은 ${result.name}입니다! ${result.description.substring(0, 80)}...`);
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(`나의 웹3 성격유형은 ${result.name}입니다! ${result.description.substring(0, 80)}...`);
    const url = encodeURIComponent(window.location.href);
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    window.open(telegramUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('링크가 클립보드에 복사되었습니다!'))
      .catch((err) => console.error('클립보드 복사 실패:', err));
  };

  // NFT 생성용 이미지 캡처 - oklch 색상 오류 수정
  const captureResultAsImage = async () => {
    if (resultCardRef.current) {
      try {
        // oklch 색상 문제를 해결하기 위해 임시 스타일 처리
        const elements = resultCardRef.current.querySelectorAll('*');
        const originalStyles: { element: HTMLElement; style: string }[] = [];
        
        // oklch 색상을 사용하는 요소의 스타일을 임시로 저장하고 변경
        elements.forEach(el => {
          const element = el as HTMLElement;
          if (element.style) {
            const computedStyle = window.getComputedStyle(element);
            const hasOklch = 
              computedStyle.color.includes('oklch') || 
              computedStyle.backgroundColor.includes('oklch') ||
              computedStyle.borderColor.includes('oklch');
            
            if (hasOklch) {
              originalStyles.push({ element, style: element.style.cssText });
              // oklch 색상을 사용하는 요소에 대체 색상 적용
              if (computedStyle.color.includes('oklch')) {
                element.style.color = '#333333';
              }
              if (computedStyle.backgroundColor.includes('oklch')) {
                element.style.backgroundColor = '#f8f9fa';
              }
              if (computedStyle.borderColor.includes('oklch')) {
                element.style.borderColor = '#e2e8f0';
              }
            }
          }
        });
        
        // 이미지 캡처
        const canvas = await html2canvas(resultCardRef.current, {
          allowTaint: true,
          useCORS: true,
          scale: 2,
          backgroundColor: null,
          logging: false
        });
        
        // 원래 스타일로 복원
        originalStyles.forEach(item => {
          item.element.style.cssText = item.style;
        });
        
        return canvas.toDataURL("image/png");
      } catch (error) {
        console.error("Error capturing result:", error);
        alert("이미지 캡처 중 오류가 발생했습니다.");
      }
    }
    return null;
  };

  // 이미지를 파일로 다운로드
  const downloadResultImage = async () => {
    const dataUrl = await captureResultAsImage();
    if (!dataUrl) return;
    
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `web3-personality-${result.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      {/* 결과 헤더 */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="text-6xl mb-4">{result.emoji}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{result.name}</h2>
        
        {/* 공유 버튼 */}
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-[#1DA1F2] hover:bg-[#1DA1F2]/10" 
            onClick={handleTwitterShare}
          >
            <Twitter size={16} />
            <span>트위터</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-[#0088cc] hover:bg-[#0088cc]/10" 
            onClick={handleTelegramShare}
          >
            <Send size={16} />
            <span>텔레그램</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleCopyLink}
          >
            <Copy size={16} />
            <span>링크 복사</span>
          </Button>
        </div>
      </div>
        
      {/* 유형 설명 */}
      <div ref={resultCardRef} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <h3 className="text-xl font-semibold mb-3">유형 설명</h3>
        <p className="text-gray-700 mb-6">{result.description}</p>
        
        {/* 부 유형 정보 표시 */}
        {secondaryType && secondaryTypePercent && secondaryTypePercent >= 30 && (
          <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="font-bold text-lg mb-2 text-amber-700 flex items-center">
              <span className="mr-2">{secondaryType.emoji}</span>
              <span>부 성향: {secondaryType.name}</span>
            </h3>
            <p className="text-gray-700 mb-2">
              당신은 주 유형 외에 <span className="font-semibold text-amber-700">{secondaryType.name}</span> 성향도 {secondaryTypePercent.toFixed(0)}% 가지고 있습니다.
            </p>
            <p className="text-sm text-gray-600">{secondaryType.description.split('.')[0]}.</p>
          </div>
        )}
        
        {/* 공감할 수 있는 일상적인 특징들 섹션 추가 */}
        {result.commonTraits && result.commonTraits.length > 0 && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-blue-700">당신은 이런 특징이 있을 거예요</h3>
            <ul className="space-y-2">
              {result.commonTraits.map((trait: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-3">당신을 나타내는 키워드</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {result.keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">추천 커뮤니티</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
          {result.recommendedCommunities.map((community, index) => (
            <li key={index}>{community}</li>
          ))}
        </ul>
        
        <h3 className="text-xl font-semibold mb-3">NFT 이미지 설명</h3>
        <p className="text-gray-700 italic border-l-4 border-gray-200 pl-4 py-2">
          {result.nftDescription}
        </p>
      </div>
      
      {/* 액션 버튼 */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">이 결과로 무엇을 할까요?</h3>
        
        <div className="flex flex-col gap-4 mb-4">
          <Button 
            onClick={downloadResultImage}
            variant="outline"
            className="h-auto py-3"
          >
            결과 이미지 저장하기
          </Button>
          
          <Button 
            onClick={onRestart}
            variant="ghost"
            className="w-full"
          >
            테스트 다시하기
          </Button>
        </div>
      </div>
    </div>
  );
} 