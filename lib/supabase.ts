import { createClient } from '@supabase/supabase-js';
// import type { Database } from '@/types/supabase';

// Supabase 타입 정의 간소화 (원래는 파일에서 import 해야 함)
type Database = {
  public: {
    Tables: {
      user_submissions: {
        Row: {
          id?: number;
          chain_id: number;
          address: string;
          is_evm: boolean;
          chain_name: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          chain_id: number;
          address: string;
          is_evm: boolean;
          chain_name: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Update: {
          chain_id?: number;
          address?: string;
          is_evm?: boolean;
          chain_name?: string;
          status?: string;
          updated_at?: string;
        };
      }
    };
  };
};

// 환경 변수 확인 - 개발 중에 문제 미리 감지
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('필수 Supabase 환경 변수가 설정되지 않았습니다.');
}

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 생성
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 주소 형식 검증 함수 (기본적인 검증만 수행)
function validateAddress(address: string, isEVM: boolean): boolean {
  address = address.trim();
  
  // 기본 길이 확인
  if (address.length < 10) return false;
  
  // EVM 주소는 0x로 시작하는지 확인
  if (isEVM && !address.startsWith('0x')) return false;
  
  return true;
}

// 체인 주소 제출 함수 - 단순화 버전
export async function submitChainAddress(chainId: number, address: string, isEVM: boolean, chainName: string) {
  // 파라미터 유효성 검사
  if (!chainId || chainId <= 0) {
    throw new Error("유효하지 않은 체인 ID입니다.");
  }
  
  // 주소 정제 및 검증
  address = address.trim();
  if (!validateAddress(address, isEVM)) {
    throw new Error("유효하지 않은 주소 형식입니다.");
  }
  
  // 체인 이름 확인
  if (!chainName || chainName.trim() === '') {
    throw new Error("체인 이름이 필요합니다.");
  }
  
  try {    
    const now = new Date().toISOString();
    
    // 사용자 제출 정보만 저장
    const { data, error } = await supabase
      .from('user_submissions')
      .insert([
        { 
          chain_id: chainId,
          address: address,
          is_evm: isEVM,
          chain_name: chainName,
          status: 'pending',
          created_at: now,
          updated_at: now
        }
      ]);
    
    if (error) {
      // 개발 모드에서만 전체 오류 로깅 (프로덕션에서는 사용자에게 보여줄 메시지와 분리)
      console.error('Error submitting chain address:', error);
      
      // 중복 오류 특별 처리
      if (error.code === '23505') { // PostgreSQL unique violation
        throw new Error("이미 제출된 주소입니다.");
      }
      
      throw new Error("데이터 저장 중 오류가 발생했습니다.");
    }
    
    return data;
  } catch (error) {
    // 이미 에러 처리가 된 경우 그대로 전달
    if (error instanceof Error) {
      throw error;
    }
    
    // 알 수 없는 에러인 경우 일반적인 메시지로 감싸기
    console.error('Failed to submit address:', error);
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
} 