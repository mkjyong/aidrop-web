"use client";

import { useState, useEffect } from "react";
import { questions as defaultQuestions } from "@/lib/personality-types";
import { Button } from "@/components/ui/button";

interface PersonalityTestProps {
  currentQuestion: number;
  onAnswer: (questionIndex: number, answerValue: number) => void;
  answers: number[];
  questions?: typeof defaultQuestions;
}

export function PersonalityTest({ 
  currentQuestion, 
  onAnswer, 
  answers,
  questions = defaultQuestions
}: PersonalityTestProps) {
  // 로컬 상태 관리
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 현재 표시할 질문 및 답변 옵션들
  const question = questions[currentQuestion];
  
  // 새 질문으로 이동할 때마다 선택 상태 초기화
  useEffect(() => {
    setSelectedOption(answers[currentQuestion] || null);
    setIsTransitioning(true);
    
    // 애니메이션 효과를 위한 타이밍
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentQuestion, answers]);
  
  // 답변 선택 핸들러
  const handleOptionSelect = (value: number) => {
    setSelectedOption(value);
  };
  
  // 다음 질문으로 넘어가는 핸들러
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      onAnswer(currentQuestion, selectedOption);
    }
  };

  // 이전 질문으로 돌아가는 핸들러
  const handlePreviousQuestion = () => {
    // 페이지 상위 컴포넌트에 이전 질문으로 돌아가도록 -1을 전달
    // 이때 현재 선택한 답변은 저장하지 않음
    onAnswer(currentQuestion - 1, answers[currentQuestion - 1] || 0);
  };

  // 진행 상태 표시 (예: 5/25)
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            {currentQuestion + 1}/{questions.length} 문항
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progressPercentage)}% 완료
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div 
        className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <h3 className="text-xl font-bold mb-6">
          {question?.text || "질문을 불러오는 중..."}
        </h3>
        
        <div className="space-y-3 mb-8">
          {question?.options.map((option) => (
            <div 
              key={option.value}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedOption === option.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleOptionSelect(option.value)}
            >
              <div className="flex items-center">
                <div 
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    selectedOption === option.value 
                      ? 'bg-blue-500 text-white' 
                      : 'border border-gray-300'
                  }`}
                >
                  {selectedOption === option.value && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <p className="text-gray-800 flex-1">{option.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          {/* 이전 버튼 - 첫 질문이 아닐 때만 표시 */}
          {currentQuestion > 0 && (
            <Button
              onClick={handlePreviousQuestion}
              variant="outline"
              className="px-6 py-2"
            >
              이전 질문
            </Button>
          )}
          
          {/* 다음 버튼 - 항상 우측 정렬 */}
          <div className={currentQuestion === 0 ? "ml-auto" : ""}>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="px-6 py-2"
            >
              {currentQuestion < questions.length - 1 ? '다음 질문' : '결과 확인하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 