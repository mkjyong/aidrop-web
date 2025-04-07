"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FeatureSection } from "@/components/feature-section";
import { ProcessSteps } from "@/components/process-steps";
import { AddressForm } from "@/components/address-form";
import { SuccessMessage } from "@/components/success-message";
import { ChevronDown, ArrowRight, Layers, LucideShieldCheck } from "lucide-react";
import { ChainAddressInfo } from "@/lib/utils";
import { getChainById, chains } from "@/lib/chains";
import { submitChainAddress } from "@/lib/supabase";

export default function Home() {
  const [submittedInfo, setSubmittedInfo] = useState<ChainAddressInfo | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 공유 텍스트 생성 함수
  const generateShareText = (chainId: number) => {
    const chain = getChainById(chainId);
    return `저의 ${chain?.name || ""} 온체인 아이덴티티를 AiDrop에서 분석 중입니다! 2주 후 제 지갑으로 온체인 MBTI NFT를 받을 예정이에요. 당신도 참여해보세요!`;
  };

  const handleAddressSubmit = async (data: ChainAddressInfo) => {
    // 이전 오류 상태 초기화
    setSubmitError(null);
    
    try {
      const chain = getChainById(data.chainId);
      
      if (!chain) {
        const errorMessage = "선택한 체인 정보를 찾을 수 없습니다.";
        setSubmitError(errorMessage);
        return;
      }
      
      // 주소 형식 간단 검증 (예시: 최소 길이)
      if (data.address.trim().length < 10) {
        const errorMessage = "유효하지 않은 주소 형식입니다.";
        setSubmitError(errorMessage);
        return;
      }
      
      // Supabase에 데이터 저장
      await submitChainAddress(
        data.chainId, 
        data.address, 
        chain.isEVM, 
        chain.name
      );
            
      // 상태 업데이트
      setSubmittedInfo(data);
    } catch (error) {
      console.error("데이터 저장 중 오류가 발생했습니다:", error);
      
      // 사용자 친화적인 오류 메시지 설정
      const errorMessage = error instanceof Error 
        ? "저장 중 문제가 발생했습니다: " + error.message.split(":")[0]  // 상세 오류 메시지 제한
        : "주소 제출 중 오류가 발생했습니다. 다시 시도해주세요.";
      
      setSubmitError(errorMessage);
      
      // UI에 오류 표시 (alert 대신 인라인 방식으로 변경)
    }
  };

  // 텔레그램 공유 함수
  const shareToTelegram = (chainId: number) => {
    const text = generateShareText(chainId);
    window.open(`https://t.me/share/url?url=${encodeURIComponent("https://aidrop.me")}&text=${encodeURIComponent(text)}`);
  };

  // 트위터 공유 함수
  const shareToTwitter = (chainId: number) => {
    const text = generateShareText(chainId);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://aidrop.me")}`);
  };

  // 클립보드 복사 함수
  const copyToClipboard = (chainId: number) => {
    const text = generateShareText(chainId) + " https://aidrop.me";
    navigator.clipboard.writeText(text)
      .then(() => {
        // 더 좋은 방법으로는 토스트 메시지 사용
        alert('공유 텍스트가 클립보드에 복사되었습니다!');
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* 히어로 섹션 - 입력 폼 통합 */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 z-0">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-400/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* 지원 체인 표시 */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 text-blue-600 text-sm font-medium">
                <Layers className="h-3.5 w-3.5" />
                <span>지원 체인: EVM 및 non-EVM 체인 포함 {chains.length}개 체인</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* 좌측: 제목 및 설명 */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  멀티체인 온체인 아이덴티티 발견하기
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  당신이 사용하는 모든 EVM과 non-EVM 체인에서의 활동을 AI로 분석하여 고유한 디지털 아이덴티티를 발견하세요. Solana, Sui와 같은 non-EVM 체인은 물론 모든 체인에서 당신의 활동 패턴을 분석합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                    <LucideShieldCheck className="h-4 w-4" />
                    <span>2025년 4월 한정 무료 분석중!</span>
                  </div>
                  <a 
                    href="#features" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <span>특징 살펴보기</span>
                    <ChevronDown className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* 우측: 입력 폼 */}
              <div className="lg:w-1/2 w-full max-w-md mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
                  {/* 오류 메시지 표시 */}
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  {submittedInfo ? (
                    <div className="mt-8 flex flex-col items-center">
                      <SuccessMessage chainId={submittedInfo.chainId} address={submittedInfo.address} />
                      <div className="mt-6 text-center">
                        <p className="text-gray-700 mb-4">
                          분석 결과는 약 2주 후 입력하신 지갑 주소로 NFT가 민팅되어 제공됩니다. 상황에 따라 더 오래 걸릴 수 있습니다.
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                          <button
                            onClick={() => shareToTelegram(submittedInfo.chainId)}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                            aria-label="텔레그램에 공유하기"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.8 5.1c-.1-.3-.3-.5-.5-.7-.4-.2-.8-.3-1.3-.2 0 0-18 6.4-18.7 7.1-.3.3-.3.6-.3.8.1.5.5.7.9.9.6.2 1.5.5 1.5.5l4.7 1.4c.2.7 1.1 3.8 1.3 4.5.1.4.3.9.6 1 .3.2.6.1.8 0 .6-.2 1-.7 1-.7l2.6 2.1c.5.4 1.2.3 1.4.3.8-.2.9-1 .9-1s2.8-11.2 2.9-12.6c0-.2 0-.3 0-.5-.1-.4-.2-.5-.3-.7zm-3.2 2L9.9 15l-.3 3.4L8 14l10.6-6.9z" fill="currentColor" strokeWidth="0"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => shareToTwitter(submittedInfo.chainId)}
                            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                            aria-label="X(트위터)에 공유하기"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => copyToClipboard(submittedInfo.chainId)}
                            className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                            aria-label="텍스트 복사하기"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">나의 온체인 아이덴티티는?</h2>
                        <p className="text-gray-600">분석할 체인과 주소를 입력하고 당신만의 특별한 NFT를 받아보세요</p>
                      </div>
                      <AddressForm onSubmit={handleAddressSubmit} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FeatureSection />
          </div>
        </section>

        {/* 프로세스 섹션 */}
        <section id="process" className="py-20">
          <ProcessSteps />
        </section>

        {/* 참여 유도 섹션 */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">지금 바로 분석을 시작하세요</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              여러분의 온체인 활동이 어떤 특성을 가지고 있는지 알아보고 싶으신가요? 이더리움, 솔라나, 수이 등 어떤 체인이든 선택하고 지금 바로 시작하세요.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a 
                href="#top" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                <span>분석 시작하기</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="text-xs font-semibold text-blue-600">2025년 4월 한정 무료 분석 기회를 놓치지 마세요!</p>
              <p className="text-xs text-gray-600 mt-1">분석 결과는 약 2주 후 지갑 주소로 NFT가 민팅되어 제공됩니다</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
