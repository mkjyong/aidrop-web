import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  // Supabase 환경변수 로드
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { company, email, month } = await req.json();
    if (!company || !email || !month) {
      return NextResponse.json({ error: '회사명, 이메일, 월 정보가 필요합니다.' }, { status: 400 });
    }
    // enterprise_subscriptions 테이블에 삽입
    const { error } = await supabase
      .from('enterprise_subscriptions')
      .insert([{ company, email, month }]);
    if (error) throw error;
    return NextResponse.json({ message: '구독이 정상적으로 기록되었습니다.' });
  } catch (err: any) {
    console.error('Enterprise subscribe API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 