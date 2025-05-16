import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트는 핸들러 내부에서 생성합니다.
export async function GET(req: NextRequest) {
  // 환경변수 체크 및 클라이언트 초기화
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars');
    return NextResponse.json({ total: 0, distribution: [] });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    // 모든 유저의 타입을 조회
    const { data: users, error } = await supabase
      .from('users')
      .select('type');

    if (error) throw error;

    const total = users?.length || 0;
    const countMap = (users || []).reduce((acc: Record<string, number>, user) => {
      const t = user.type as string;
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});

    const distribution = Object.entries(countMap).map(([type, count]) => ({
      type,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }));

    return NextResponse.json({ total, distribution });
  } catch (err) {
    console.error('Distribution API error:', err);
    // 에러 발생 시 빈 배열 반환
    return NextResponse.json({ total: 0, distribution: [] });
  }
} 