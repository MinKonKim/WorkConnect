'use client';

import { isEmpty } from '@/utils/isEmpty';
import Notice from './Notice';
import useChatNotice from '../../_hooks/useChatNotice';

const NoticeBar = () => {
  const { latestNotice, noticeUrl } = useChatNotice();
  if (isEmpty(latestNotice)) return null;

  return <Notice href={noticeUrl} text={latestNotice.content} />;
};

export default NoticeBar;
