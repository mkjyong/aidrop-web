import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트는 핸들러 내부에서 생성합니다.
export async function POST(req: NextRequest) {
  // 환경변수 체크 및 클라이언트 초기화
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다.' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('newsletter')
      .upsert({ email }, { onConflict: 'email' });
    if (error) {
      throw error;
    }
    return NextResponse.json({ message: '구독이 완료되었습니다.' });
  } catch (err: any) {
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 