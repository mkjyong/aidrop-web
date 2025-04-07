"use client";

import { Brain, Cpu, Target, Zap, Layers, CircleCheckBig } from "lucide-react";

const features = [
  {
    icon: <Layers className="h-8 w-8" />,
    title: "멀티체인 분석",
    description: "이더리움 체인뿐만 아니라 솔라나, 수이 등 non-EVM 체인까지 포함한 모든 주요 블록체인에서의 활동을 종합적으로 분석합니다."
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "온체인 성격 분석",
    description: "트랜잭션 데이터를 분석하여 당신의 온체인 성격을 파악합니다. 디파이 유저인지, 게임 유저인지, 또는 NFT 컬렉터인지 알아보세요."
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "AI 기반 데이터 처리",
    description: "최신 AI 기술을 활용하여 방대한 온체인 데이터를 분석하고 유의미한 패턴을 발견합니다. 당신만의 고유한 온체인 아이덴티티를 확인하세요."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "맞춤형 에어드랍",
    description: "체인별 활동 패턴과 사용자 특성에 맞는 정확한 타겟팅으로 더 이상 무분별한 에어드랍은 없습니다. 당신의 관심사와 활동에 맞는 프로젝트를 발견하세요."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "온체인 MBTI NFT",
    description: "분석 결과를 바탕으로 당신만의 온체인 성격 유형을 나타내는 NFT를 발행해 드립니다. 당신의 온체인 아이덴티티를 자랑하세요."
  },
  {
    icon: <CircleCheckBig className="h-8 w-8" />,
    title: "크로스체인 분석",
    description: "여러 체인에서의 활동을 종합 분석하여 체인 간 활동 패턴과 상관관계를 파악합니다. 특정 체인에서 주로 어떤 활동을 하는지 확인해보세요."
  }
];

export function FeatureSection() {
  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4 px-4 py-1 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-blue-600 font-medium text-sm">2025년 4월 한정 무료 분석 진행 중!</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI 기반 멀티체인 데이터 분석
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          EVM 체인부터 Solana, Sui, NEAR까지 모든 체인에서의 온체인 활동을 분석하여 
          독특한 디지털 아이덴티티를 발견하세요. 더 이상 소모적인 에어드랍은 없습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col h-full relative z-10">
              <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 w-fit">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
              
              <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-6 group-hover:w-20 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-blue-50 border border-blue-100">
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-blue-700 font-medium">2025년 4월 한정 무료 멀티체인 분석 진행 중</span>
        </div>
      </div>
    </div>
  );
} 