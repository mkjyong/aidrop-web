"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PersonalityTest } from "@/components/personality-test";
import { PersonalityResult } from "@/components/personality-result";
import { personalityTypes, PersonalityType, questions } from "@/lib/personality-types";
import { personalityTypes as simplePersonalityTypes } from "@/lib/personality-types-simple";
import { typeWeights as simpleTypeWeights, typePreferences as simpleTypePreferences } from "@/lib/personality-types-simple";
import { questions as simpleQuestions } from "@/lib/personality-types-simple";

// 유형별 질문에 대한 점수 가중치 정의 (어떤 질문이 어떤 유형에 더 중요한지)
const typeWeights: Record<string, Record<number, number>> = {
  "explorer": { 1: 3, 6: 3, 9: 2, 11: 2, 18: 2, 21: 1 },
  "dao-dreamer": { 4: 3, 7: 3, 13: 2, 16: 1, 19: 3, 21: 2 },
  "airdrop-hunter": { 1: 2, 6: 2, 10: 3, 11: 2, 17: 1, 21: 1 },
  "defi-degen": { 1: 3, 3: 2, 10: 1, 12: 3, 19: 2, 22: 1 },
  "diamond-hands": { 3: 3, 11: 1, 12: 3, 19: 1, 20: 2, 22: 2 },
  "paper-hands": { 3: 3, 11: 2, 12: 3, 13: 1, 19: 1, 22: 3 },
  "nft-collector": { 2: 3, 9: 1, 15: 3, 17: 2, 18: 1, 21: 1 },
  "metaverse-nomad": { 2: 1, 9: 3, 15: 1, 17: 2, 18: 2, 21: 2 },
  "builder": { 6: 2, 7: 2, 13: 3, 16: 3, 20: 1, 21: 2 },
  "security-sentinel": { 1: 1, 8: 3, 14: 2, 16: 2, 20: 1, 22: 2 },
  "privacy-purist": { 7: 2, 8: 2, 14: 3, 17: 2, 19: 3, 21: 3 },
  "maximalist": { 7: 3, 11: 2, 12: 3, 13: 2, 20: 3, 22: 1 },
  "omnichain-wanderer": { 3: 1, 6: 3, 9: 1, 17: 1, 18: 2, 23: 2 },
  "whale": { 3: 2, 8: 2, 12: 3, 18: 2, 19: 3, 25: 1 },
  "community-connector": { 4: 1, 13: 3, 15: 2, 17: 2, 18: 3, 21: 4 },
  "alpha-seeker": { 6: 2, 10: 2, 11: 3, 13: 2, 16: 2, 22: 2 },
  "meme-lord": { 2: 2, 11: 3, 13: 3, 15: 1, 17: 2, 21: 4 },
  "solidity-sage": { 7: 2, 8: 2, 13: 2, 16: 3, 20: 2, 21: 2 },
  "governance-guru": { 4: 3, 7: 3, 13: 3, 16: 2, 19: 2, 21: 3 },
  "layer2-pioneer": { 6: 2, 7: 3, 16: 2, 20: 2, 21: 2, 23: 3 },
  "refi-advocate": { 5: 2, 7: 3, 19: 3, 20: 2, 21: 3, 24: 3 },
  "arbitrage-specialist": { 1: 2, 3: 2, 6: 2, 12: 3, 23: 2, 25: 3 }
};

// 유형별 질문 응답 선호도 (어떤 응답이 어떤 유형에 더 가까운지)
const typePreferences: Record<string, Record<number, number>> = {
  "explorer": { 1: 1, 6: 1, 9: 1, 11: 1, 18: 1, 21: 2 },
  "dao-dreamer": { 4: 4, 7: 4, 13: 1, 16: 2, 19: 3, 21: 3 },
  "airdrop-hunter": { 1: 1, 6: 1, 10: 1, 11: 2, 17: 2, 21: 1 },
  "defi-degen": { 1: 1, 3: 3, 10: 1, 12: 1, 19: 1, 22: 1 },
  "diamond-hands": { 3: 2, 11: 4, 12: 2, 19: 2, 20: 1, 22: 1 },
  "paper-hands": { 3: 1, 11: 3, 12: 1, 13: 3, 19: 1, 22: 3 },
  "nft-collector": { 2: 1, 9: 2, 15: 1, 17: 1, 18: 2, 21: 4 },
  "metaverse-nomad": { 2: 2, 9: 1, 15: 2, 17: 1, 18: 1, 21: 4 },
  "builder": { 6: 2, 7: 2, 13: 1, 16: 1, 20: 1, 21: 2 },
  "security-sentinel": { 1: 2, 8: 1, 14: 1, 16: 1, 20: 3, 22: 2 },
  "privacy-purist": { 7: 1, 8: 1, 14: 1, 17: 3, 19: 4, 21: 3 },
  "maximalist": { 7: 2, 11: 4, 12: 3, 13: 1, 20: 1, 22: 1 },
  "omnichain-wanderer": { 3: 3, 6: 1, 9: 2, 17: 1, 18: 1, 23: 1 },
  "whale": { 3: 3, 8: 1, 12: 1, 18: 1, 19: 1, 25: 1 },
  "community-connector": { 4: 3, 13: 1, 15: 2, 17: 1, 18: 1, 21: 4 },
  "alpha-seeker": { 6: 1, 10: 2, 11: 1, 13: 2, 16: 2, 22: 2 },
  "meme-lord": { 2: 2, 11: 1, 13: 1, 15: 2, 17: 1, 21: 4 },
  "solidity-sage": { 7: 2, 8: 1, 13: 2, 16: 1, 20: 2, 21: 2 },
  "governance-guru": { 4: 4, 7: 4, 13: 1, 16: 2, 19: 4, 21: 3 },
  "layer2-pioneer": { 6: 1, 7: 2, 16: 1, 20: 2, 21: 2, 23: 1 },
  "refi-advocate": { 5: 4, 7: 4, 19: 4, 20: 2, 21: 3, 24: 1 },
  "arbitrage-specialist": { 1: 1, 3: 3, 6: 1, 12: 1, 23: 2, 25: 1 }
};

// 유형 간 유사성 매트릭스 (유사한 유형들 간의 관계 정의)
const typeSimilarities: Record<string, string[]> = {
  "explorer": ["omnichain-wanderer", "airdrop-hunter", "layer2-pioneer"],
  "dao-dreamer": ["governance-guru", "community-connector", "refi-advocate"],
  "airdrop-hunter": ["explorer", "alpha-seeker", "paper-hands"],
  "defi-degen": ["arbitrage-specialist", "whale", "paper-hands"],
  "diamond-hands": ["maximalist", "whale", "security-sentinel"],
  "paper-hands": ["defi-degen", "airdrop-hunter", "arbitrage-specialist"],
  "nft-collector": ["metaverse-nomad", "community-connector", "meme-lord"],
  "metaverse-nomad": ["nft-collector", "community-connector", "explorer"],
  "builder": ["solidity-sage", "layer2-pioneer", "security-sentinel"],
  "security-sentinel": ["privacy-purist", "builder", "diamond-hands"],
  "privacy-purist": ["security-sentinel", "builder", "refi-advocate"],
  "maximalist": ["diamond-hands", "whale", "community-connector"],
  "omnichain-wanderer": ["explorer", "arbitrage-specialist", "layer2-pioneer"],
  "whale": ["diamond-hands", "defi-degen", "maximalist"],
  "community-connector": ["meme-lord", "dao-dreamer", "governance-guru"],
  "alpha-seeker": ["airdrop-hunter", "arbitrage-specialist", "explorer"],
  "meme-lord": ["community-connector", "nft-collector", "alpha-seeker"],
  "solidity-sage": ["builder", "layer2-pioneer", "security-sentinel"],
  "governance-guru": ["dao-dreamer", "community-connector", "refi-advocate"],
  "layer2-pioneer": ["builder", "omnichain-wanderer", "solidity-sage"],
  "refi-advocate": ["dao-dreamer", "governance-guru", "privacy-purist"],
  "arbitrage-specialist": ["defi-degen", "omnichain-wanderer", "alpha-seeker"]
};

// 간단 테스트 유형 간 유사성 매트릭스
const simpleTypeSimilarities: Record<string, string[]> = {
  "explorer": ["airdrop-hunter", "builder"],
  "airdrop-hunter": ["explorer", "defi-degen"],
  "defi-degen": ["airdrop-hunter", "whale"],
  "diamond-hands": ["maximalist", "whale"],
  "nft-collector": ["community-connector", "builder"],
  "builder": ["explorer", "security-sentinel"],
  "security-sentinel": ["builder", "diamond-hands"],
  "maximalist": ["diamond-hands", "whale"],
  "whale": ["diamond-hands", "defi-degen"],
  "community-connector": ["nft-collector", "builder"]
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [result, setResult] = useState<PersonalityType | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [mintingStatus, setMintingStatus] = useState<"idle" | "minting" | "success" | "error">("idle");
  const [testMode, setTestMode] = useState<"simple" | "advanced">("simple"); // 기본값을 simple로 설정
  const [secondaryTypeInfo, setSecondaryTypeInfo] = useState<{ type: PersonalityType | null; percent: number }>({ type: null, percent: 0 });

  const handleQuestionAnswer = (questionIndex: number, answerValue: number) => {
    // 이전 질문으로 돌아가는 경우 (questionIndex가 현재 질문보다 작을 때)
    if (questionIndex < currentQuestion) {
      setCurrentQuestion(questionIndex);
      return;
    }
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerValue;
    setAnswers(newAnswers);
    
    // 테스트 모드에 따라 마지막 질문인지 확인
    const currentQuestions = testMode === "simple" ? simpleQuestions : questions;
    
    // Move to the next question if it's not the last one
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Test is completed, calculate the result
      setTestCompleted(true);
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers: number[]) => {
    // 테스트 모드에 따라 사용할 유형, 가중치, 선호도 등 결정
    const types = testMode === "simple" ? simplePersonalityTypes : personalityTypes;
    const weights = testMode === "simple" ? simpleTypeWeights : typeWeights;
    const preferences = testMode === "simple" ? simpleTypePreferences : typePreferences;
    const similarities = testMode === "simple" ? simpleTypeSimilarities : typeSimilarities;
    
    // 각 유형별 점수 계산
    const scores: Record<string, number> = {};
    
    // 모든 유형에 대해 점수 초기화
    types.forEach((type: PersonalityType) => {
      scores[type.id] = 0;
    });
    
    // 각 질문에 대한 답변 분석
    answers.forEach((answer, questionIndex) => {
      const questionNum = questionIndex + 1; // 질문 번호는 1부터 시작
      
      // 모든 유형에 대해 해당 질문이 중요한지, 어떤 답변을 선호하는지 확인
      types.forEach((type: PersonalityType) => {
        const typeId = type.id;
        
        // 이 유형에 이 질문이 중요하다면 (가중치가 있다면)
        if (weights[typeId] && weights[typeId][questionNum]) {
          const weight = weights[typeId][questionNum];
          
          // 이 유형이 선호하는 답변이 있다면
          if (preferences[typeId] && preferences[typeId][questionNum]) {
            const preferredAnswer = preferences[typeId][questionNum];
            
            // 선호하는 답변과 사용자의 답변 사이의 근접성에 따라 점수 부여
            // 답변이 동일하면 가중치 * 2점, 1점 차이면 가중치 * 1점, 2점 차이면 가중치 * 0.5점, 3점 차이면 0점
            const difference = Math.abs(preferredAnswer - answer);
            
            if (difference === 0) {
              scores[typeId] += weight * 2;
            } else if (difference === 1) {
              scores[typeId] += weight * 1;
            } else if (difference === 2) {
              scores[typeId] += weight * 0.5;
            }
            // 3점 차이는 점수 없음
          }
        }
        
        // 기본 점수 추가 (모든 답변에 대해 약간의 영향력)
        scores[typeId] += answer * 0.1;
      });
    });
    
    // 베이지안 보정 - 유사한 유형들 간의 점수 영향
    // 한 유형이 높은 점수를 받으면 유사한 유형들도 약간의 점수를 받게 함
    Object.entries(scores).forEach(([typeId, score]) => {
      if (similarities[typeId]) {
        similarities[typeId].forEach((similarTypeId, index) => {
          // 유사성에 따라 가중치 부여 (첫 번째가 가장 유사)
          const similarityWeight = 0.2 / (index + 1);
          scores[similarTypeId] += score * similarityWeight;
        });
      }
    });
    
    // 점수를 내림차순 정렬하여 상위 유형 가져오기
    const sortedScores = Object.entries(scores)
      .sort((a, b) => b[1] - a[1]);
    
    // 가장 높은 점수 유형
    const bestMatchTypeId = sortedScores[0][0];
    const bestMatchScore = sortedScores[0][1];
    
    // 두 번째로 높은 점수 유형 (있는 경우)
    const secondBestMatchTypeId = sortedScores.length > 1 ? sortedScores[1][0] : null;
    const secondBestMatchScore = sortedScores.length > 1 ? sortedScores[1][1] : 0;
    
    // 두 유형 점수의 합을 100%로 보고, 두 번째 유형의 상대적 백분율 계산
    const totalTopTwoScore = bestMatchScore + secondBestMatchScore;
    const secondTypePercent = (secondBestMatchScore / totalTopTwoScore) * 100;
    
    // 주 유형 설정
    const matchedType = types.find((type: PersonalityType) => type.id === bestMatchTypeId);
    setResult(matchedType || types[0]);
    
    // 부 유형 설정 (점수가 25% 이상일 때만 의미있게 설정)
    let secondaryType: PersonalityType | null = null;
    let secondaryTypePercent = 0;

    if (secondBestMatchTypeId && secondTypePercent >= 25) {
      const foundType = types.find((type: PersonalityType) => type.id === secondBestMatchTypeId);
      if (foundType) {
        secondaryType = foundType;
        secondaryTypePercent = secondTypePercent;
      }
    }
    
    // 부 유형 정보 설정
    setSecondaryTypeInfo({
      type: secondaryType,
      percent: secondaryTypePercent
    });
    
    // 디버깅용 - 상위 3개 유형과 점수 확인 (콘솔에만 출력)
    console.log("Score breakdown:", 
      sortedScores
        .slice(0, 3)
        .map(([typeId, score]) => `${typeId}: ${score.toFixed(2)} (${((score / totalTopTwoScore) * 100).toFixed(1)}%)`)
    );
  };

  const handleWalletConnect = (connected: boolean) => {
    setWalletConnected(connected);
  };

  const handleMintNFT = async () => {
    if (!result || !walletConnected) return;
    
    try {
      setMintingStatus("minting");
      // This would be replaced with actual NFT minting logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate minting
      setMintingStatus("success");
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMintingStatus("error");
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTestCompleted(false);
    setResult(null);
    setMintingStatus("idle");
    setSecondaryTypeInfo({ type: null, percent: 0 });
  };

  const switchTestMode = (mode: "simple" | "advanced") => {
    setTestMode(mode);
    resetTest();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 z-0">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-400/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                웹3 온체인 성격검사
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                웹3 커뮤니티의 밈 문화를 반영한 재미있는 성격유형 테스트로, 당신의 온체인 성향을 알아보세요. 
                테스트 결과는 NFT로 민팅하여 영원히 소장할 수 있습니다.
              </p>
              
              {/* 테스트 모드 선택 */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => switchTestMode("simple")}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    testMode === "simple" 
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  간단 테스트 (10문항)
                </button>
                <button
                  onClick={() => switchTestMode("advanced")}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    testMode === "advanced"
                      ? "bg-purple-100 text-purple-700 border-2 border-purple-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  심화 테스트 (25문항)
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl max-w-4xl mx-auto">
              {testCompleted && result ? (
                <PersonalityResult 
                  result={result}
                  onMintNFT={handleMintNFT}
                  onRestart={resetTest}
                  walletConnected={walletConnected}
                  onWalletConnect={handleWalletConnect}
                  mintingStatus={mintingStatus}
                  secondaryType={secondaryTypeInfo.type}
                  secondaryTypePercent={secondaryTypeInfo.percent}
                />
              ) : (
                <PersonalityTest 
                  currentQuestion={currentQuestion}
                  onAnswer={handleQuestionAnswer}
                  answers={answers}
                  questions={testMode === "simple" ? simpleQuestions : questions}
                />
              )}
            </div>
          </div>
        </section>

        {/* Feature section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">웹3 성격유형 테스트에 대하여</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                웹3 커뮤니티의 밈 문화와 활동 패턴을 분석하여 20가지 이상의 독특한 성격유형을 정의했습니다.
                이 테스트를 통해 자신이 어떤 웹3 유형인지 재미있게 알아보세요!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">온체인 NFT 민팅</h3>
                <p className="text-gray-700">
                  테스트 결과를 NFT로 발행하여 지갑에 영원히 소장하세요. 
                  당신의 웹3 정체성을 증명하는 유일무이한 디지털 자산이 됩니다.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">웹3 특화 유형</h3>
                <p className="text-gray-700">
                  기존 MBTI의 16유형을 넘어, 웹3 사용자들의 특별한 행동 패턴과 
                  성향을 반영한 20가지 이상의 다양한 유형을 정의했습니다.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">커뮤니티 연결</h3>
                <p className="text-gray-700">
                  같은 유형의 사람들과 커뮤니티를 형성하고 소통할 수 있습니다.
                  당신과 비슷한 웹3 성향을 가진 사람들을 찾아보세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">지금 바로 테스트를 시작하세요</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              {testMode === "simple" 
                ? "간단 테스트는 약 2분 정도 소요되며, 총 10개의 질문으로 이루어져 있습니다." 
                : "심화 테스트는 약 5분 정도 소요되며, 총 25개의 질문으로 이루어져 있습니다."}
              당신이 어떤 웹3 성격 유형인지 지금 바로 확인해보세요!
            </p>
            <div className="flex justify-center">
              <button 
                onClick={resetTest}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                <span>테스트 시작하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
