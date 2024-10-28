'use client';

import { useFetchChannelInfos } from '../_hooks/useFetchChannelName';
import { TopBar } from '@/components/Layout/TopBar';
import { MenuIcon, XIcon } from '@/icons';
import Avatar from '@/components/Avatar';
import useChatSidebarStore from '@/store/useChatSidebar';
import NoticeBar from './NoticeBar';

const ChatHeader = () => {
  const { name: channelName, channel_thumbnail: channelThumbnail } = useFetchChannelInfos();
  const { isOpen, toggleSidebar } = useChatSidebarStore();

  return (
    <>
      <TopBar
        title={
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <Avatar size="40px" className="hidden lg:flex" src={channelThumbnail} />
            {channelName}
          </div>
        }
        Icon4={
          isOpen ? (
            <XIcon onClick={toggleSidebar} />
          ) : (
            <button type="button" onClick={toggleSidebar} aria-label="메뉴 열기">
              <MenuIcon />
            </button>
          )
        }
      />
      <NoticeBar />
    </>
  );
};

export default ChatHeader;
