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

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 생성
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 체인 주소 제출 함수 - 단순화 버전
export async function submitChainAddress(chainId: number, address: string, isEVM: boolean, chainName: string) {
  try {    
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Error submitting chain address:', error);
      throw error;
    }
        return data;
  } catch (error) {
    console.error('Failed to submit address:', error);
    throw error;
  }
} 