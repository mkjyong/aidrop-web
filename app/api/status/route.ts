import { NextResponse } from 'next/server';
import { analysisStatus, statusMessage } from '../request-mbti/route';

// 글로벌 상태 변수에 접근하기 위한 외부 모듈 가져오기
// 실제 구현에서는 상태 관리를 위한 적절한 저장소 사용 필요

// 분석 상태를 확인하는 GET 엔드포인트
export async function GET() {
  try {
    let responseStatus = 200;
    
    // 현재 시간을 추가하여 테스트 시 상태 업데이트를 확인하기 쉽게 함
    const currentTime = new Date().toLocaleTimeString();
    
    let response = {
      status: analysisStatus,
      message: statusMessage,
      timestamp: currentTime
    };
    
    return NextResponse.json(response, { status: responseStatus });
  } catch (error) {
    console.error("상태 확인 중 오류:", error);
    return NextResponse.json(
      { error: "상태 확인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 