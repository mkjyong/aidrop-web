import { NextResponse } from 'next/server';
import { analysisStatus, analysisResult } from '../request-mbti/route';

// MBTI 분석 결과를 가져오는 GET 엔드포인트
export async function GET() {
  try {
    // 현재 시간 추가
    const currentTime = new Date().toLocaleTimeString();
    
    // 분석이 완료되지 않은 경우
    if (analysisStatus !== "completed" || !analysisResult) {
      return NextResponse.json(
        { 
          error: "분석 결과가 아직 준비되지 않았습니다.",
          status: analysisStatus,
          timestamp: currentTime
        },
        { status: 404 }
      );
    }
    
    // 분석 결과와 함께 시간정보 반환
    return NextResponse.json({
      ...analysisResult,
      timestamp: currentTime
    });
    
  } catch (error) {
    console.error("결과 가져오기 중 오류:", error);
    return NextResponse.json(
      { error: "결과 가져오기 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 