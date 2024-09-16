import { getActivityScheduler } from '@/services/etc';
import { NextRequest, NextResponse } from 'next/server';
import {
  SCHEDULER_RESPONSE_GET_FAILED,
  SCHEDULER_RESPONSE_SUCCESS,
  SCHEDULER_RESPONSE_UNAUTHORIZED
} from './constants';
import * as Sentry from '@sentry/node';

/**
 * Scheduler GET 요청 핸들러
 * @description 스케줄러를 조회합니다.
 * @throws {Error} - 스케줄러 조회에 실패한 경우
 */
export const GET = async (req: NextRequest) => {
  try {
    const { data, error } = await getActivityScheduler();

    const githubActionHeader = req.headers.get('X-GitHub-Action');

    if (githubActionHeader !== 'true') {
      return NextResponse.json(SCHEDULER_RESPONSE_UNAUTHORIZED, { status: 401 });
    }

    if (error) {
      return NextResponse.json(Object.assign(SCHEDULER_RESPONSE_GET_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(SCHEDULER_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    Sentry.captureMessage(`@@ Supabase 활성화를 위한 스케줄러 조회 실패`);
    return NextResponse.json(SCHEDULER_RESPONSE_GET_FAILED, { status: 400 });
  }
};
