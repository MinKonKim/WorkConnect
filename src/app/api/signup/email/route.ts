import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabaseServer';

// localhost:3100/api/signup/email?code=...
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
