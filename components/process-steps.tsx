"use client";

import { Database, LineChart, Sparkles, Award, Clock } from "lucide-react";

const steps = [
  {
    icon: <Database className="h-8 w-8" />,
    title: "데이터 수집",
    description: "블록체인에서 모든 트랜잭션과 상호작용 데이터를 수집합니다."
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "패턴 분석",
    description: "수집된 데이터를 기반으로 사용자의 행동 패턴을 분석합니다."
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "AI 처리",
    description: "AI가 데이터를 종합하여 유저의 특성과 성향을 파악합니다."
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "결과 준비",
    description: "분석된 데이터를 바탕으로 약 2주간 개인화된 NFT를 준비합니다. 상황에 따라 더 오래 걸릴 수 있습니다."
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "NFT 발행",
    description: "준비가 완료되면 입력하신 지갑 주소로 사용자 맞춤형 온체인 성격 NFT를 발행합니다."
  }
];

export function ProcessSteps() {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">분석 프로세스</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            당신의 온체인 데이터가 어떻게 처리되고 분석되는지 알아보세요. 제출 후 약 2주 안에 지갑으로 결과를 받아보실 수 있습니다.
          </p>
        </div>

        <div className="relative">
          {/* 연결선 */}
          <div className="absolute left-[50%] top-0 h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="md:w-[45%] text-center md:text-left">
                  <div className={`${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="md:w-[10%] flex justify-center">
                  <div className="p-4 rounded-full bg-white border-2 border-blue-500 shadow-lg z-10">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 