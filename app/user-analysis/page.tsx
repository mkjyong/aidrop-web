"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, Search, Check } from "lucide-react";
import Link from "next/link";
import axios from "axios";

// MBTI 분석 요청을 위한 DTO 인터페이스
interface RequestMbtiDto {
  sourceaddress: string;
  storyaddress: string;
  sourcechainId: string;
}

// MBTI 분석 결과 인터페이스
interface MbtiResult {
  sourceaddress: string;
  storyaddress: string;
  chainId: string;
  mbtiType: string; 
  analysis: string;
  traits: {
    type: string;
    description: string;
    score: number;
  }[];
  completed: boolean;
}

export default function UserAnalysisPage() {
  // 폼 상태 관리
  const [formData, setFormData] = useState<RequestMbtiDto>({
    sourceaddress: "",
    storyaddress: "",
    sourcechainId: ""
  });

  // 분석 관련 상태
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mbtiResult, setMbtiResult] = useState<MbtiResult | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 에러 메시지 초기화
    if (error) setError(null);
  };

  // MBTI 분석 요청 핸들러
  const handleRequestAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 간단한 입력 검증
    if (!formData.sourceaddress || !formData.storyaddress || !formData.sourcechainId) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // MBTI 분석 요청 API 호출
      await axios.post('/api/request-mbti', formData);
      
      // 분석 시작 상태로 변경
      setIsAnalyzing(true);
      setStatusMessage("MBTI 분석이 시작되었습니다. 약 2분 정도 소요됩니다.");
      
      // 상태 주기적으로 확인 시작
      checkStatus();
    } catch (err) {
      console.error("MBTI 분석 요청 오류:", err);
      setError("MBTI 분석 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 분석 상태 확인 함수
  const checkStatus = async () => {
    try {
      const response = await axios.get('/api/status');
      const { status, message } = response.data;
      
      setStatusMessage(message || "분석 중...");
      
      if (status === "completed") {
        // 분석이 완료되면 결과 가져오기
        fetchResult();
      } else if (status === "processing") {
        // 아직 처리 중이면 5초 후 다시 확인
        setTimeout(checkStatus, 5000);
      } else {
        // 오류 상태인 경우
        setError("분석 중 오류가 발생했습니다: " + message);
        setIsAnalyzing(false);
      }
    } catch (err) {
      console.error("상태 확인 오류:", err);
      setError("상태 확인 중 오류가 발생했습니다.");
      setIsAnalyzing(false);
    }
  };

  // 분석 결과 가져오기
  const fetchResult = async () => {
    try {
      const response = await axios.get('/api/result');
      setMbtiResult(response.data);
      setIsAnalyzing(false);
    } catch (err) {
      console.error("결과 가져오기 오류:", err);
      setError("결과를 가져오는 중 오류가 발생했습니다.");
      setIsAnalyzing(false);
    }
  };

  // MBTI 설명 매핑 함수
  const getMbtiDescription = (type: string): string => {
    const descriptions: {[key: string]: string} = {
      "INTJ": "전략적 사고와 분석을 통해 블록체인 생태계에서 장기적인 계획을 세우는 '온체인 전략가'",
      "INTP": "복잡한 프로토콜과 토큰 경제학을 분석하는 것을 즐기는 '온체인 논리학자'",
      "ENTJ": "프로젝트 리더십과 거래 전략에서 권위를 보여주는 '온체인 지휘관'",
      "ENTP": "새로운 DeFi 기회와 혁신적인 프로토콜을 탐색하는 '온체인 혁신가'",
      "INFJ": "블록체인 비전과 사회적 영향에 집중하는 '온체인 조언자'",
      "INFP": "커뮤니티 가치와 탈중앙화 이상을 추구하는 '온체인 중재자'",
      "ENFJ": "DAO 커뮤니티를 구축하고 영감을 주는 '온체인 주창자'",
      "ENFP": "새로운 NFT 트렌드와 소셜 토큰에서 가능성을 발견하는 '온체인 탐험가'",
      "ISTJ": "프로토콜 규칙과 거버넌스를 충실히 따르는 '온체인 감독관'",
      "ISFJ": "지속 가능한 투자와 커뮤니티 지원에 헌신하는 '온체인 수호자'",
      "ESTJ": "효율적인 포트폴리오 관리와 체계적인 접근 방식을 가진 '온체인 관리자'",
      "ESFJ": "웹3 커뮤니티 내에서 조화와 협력을 촉진하는 '온체인 영사'",
      "ISTP": "시장 기회를 빠르게 활용하는 실용적인 '온체인 기술자'",
      "ISFP": "NFT 창작과 독특한 디지털 표현을 추구하는 '온체인 예술가'",
      "ESTP": "고위험-고수익 거래와 시장 변동성을 즐기는 '온체인 기업가'",
      "ESFP": "소셜 토큰과 커뮤니티 이벤트에서 활발하게 활동하는 '온체인 엔터테이너'"
    };
    
    return descriptions[type] || "온체인 행동 패턴에 기반한 고유한 개성";
  };

  return (
    <>
      <div className="container mx-auto pt-20 pb-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">온체인 MBTI 분석</h1>
          <p className="text-muted-foreground text-lg">
            지갑 주소 활동을 분석하여 당신의 온체인 MBTI를 알아보세요
          </p>
        </div>

        {!mbtiResult && (
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">분석 주소 입력</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleRequestAnalysis}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="sourceaddress" className="block text-sm font-medium mb-1">
                    소스 주소 (분석할 주소)
                  </label>
                  <Input
                    id="sourceaddress"
                    name="sourceaddress"
                    value={formData.sourceaddress}
                    onChange={handleInputChange}
                    placeholder="0x..."
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="storyaddress" className="block text-sm font-medium mb-1">
                    스토리 주소 (스토리 기록 주소)
                  </label>
                  <Input
                    id="storyaddress"
                    name="storyaddress"
                    value={formData.storyaddress}
                    onChange={handleInputChange}
                    placeholder="0x..."
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="sourcechainId" className="block text-sm font-medium mb-1">
                    체인 ID
                  </label>
                  <Input
                    id="sourcechainId"
                    name="sourcechainId"
                    value={formData.sourcechainId}
                    onChange={handleInputChange}
                    placeholder="1 (이더리움), 137 (폴리곤) 등"
                    className="w-full"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || isAnalyzing}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      온체인 MBTI 분석 시작
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            {isAnalyzing && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p className="font-medium text-primary">분석 진행 중</p>
                </div>
                <p className="text-sm text-muted-foreground">{statusMessage}</p>
              </div>
            )}
          </div>
        )}
        
        {mbtiResult && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-card/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Check className="h-5 w-5 text-green-500" />
                <h2 className="text-2xl font-bold">분석 완료</h2>
              </div>
              
              <div className="mb-6 text-center py-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                <p className="text-muted-foreground mb-2">당신의 온체인 MBTI는</p>
                <h3 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {mbtiResult.mbtiType}
                </h3>
                <p className="mt-4 text-lg font-medium max-w-2xl mx-auto">
                  {getMbtiDescription(mbtiResult.mbtiType)}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">분석 결과</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {mbtiResult.analysis}
                </p>
              </div>
              
              {mbtiResult.traits && mbtiResult.traits.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">특성 분석</h3>
                  <div className="space-y-4">
                    {mbtiResult.traits.map((trait, idx) => (
                      <div key={idx} className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{trait.type}</span>
                          <span className="font-semibold">{trait.score}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${trait.score}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {trait.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => {
                    setMbtiResult(null);
                    setIsAnalyzing(false);
                    setFormData({
                      sourceaddress: "",
                      storyaddress: "",
                      sourcechainId: ""
                    });
                  }}
                >
                  새로운 분석 시작하기
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">온체인 MBTI란?</h2>
          <div className="prose text-muted-foreground">
            <p>
              온체인 MBTI는 블록체인 상에서의 활동 패턴을 분석하여 사용자의 온체인 성격 유형을 파악하는 새로운 분석 방법입니다.
              전통적인 MBTI가 심리적 선호도를 측정한다면, 온체인 MBTI는 다음과 같은 요소를 분석합니다:
            </p>
            <ul className="space-y-2 mt-4">
              <li>트랜잭션 빈도 및 패턴</li>
              <li>DeFi 참여도 및 투자 전략</li>
              <li>NFT 수집 및 거래 행동</li>
              <li>DAO 거버넌스 참여</li>
              <li>토큰 보유 기간 및 분산도</li>
              <li>네트워크 사용 다양성</li>
            </ul>
            <p className="mt-4">
              이 분석을 통해 사용자는 자신의 블록체인 활동이 어떤 성격 특성을 반영하는지 이해할 수 있으며,
              커뮤니티 내에서 자신의 역할과 가치를 새롭게 발견할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 